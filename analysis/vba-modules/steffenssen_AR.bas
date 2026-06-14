Attribute VB_Name = "steffenssen_AR"
Public p, Po, P1, P2, Error, Tolerancia As Double
Public maxIteracion, i, nIteracion, Fila As Integer
Public Formula As String

Private Sub ParametrosIniciales()
    Po = Cells(3, 5).Value
    Tolerancia = Cells(4, 5).Value
    maxIteracion = Cells(5, 5).Value
    Fila = 7
End Sub

Private Function g(ByVal X As Double) As Double
    ' Funcion para evaluar la ecuacion analizada
    Dim Ecuacion As String
    Ecuacion = Cells(2, 5).Value
    
    Formula = Replace(Ecuacion, "x", X)
    
    Formula = Replace(Formula, " ", "")
    Formula = Replace(Formula, "--", "+")
    Formula = Replace(Formula, "+-", "-")
    Formula = Replace(Formula, "-+", "-")
    
    g = Evaluate(Formula)
End Function

Sub Steffensen_AR()
    nIteracion = nIteracion + 1
    
    P1 = g(Po)
    P2 = g(P1)
    p = Po - ((P1 - Po) ^ 2) / (P2 - 2 * P1 + Po)
    
    Error = Abs(p - Po)
    
    Cells(Fila + nIteracion, 2).Value = nIteracion
    Cells(Fila + nIteracion, 4).Value = P1
    Cells(Fila + nIteracion, 5).Value = P2
    Cells(Fila + nIteracion, 6).Value = p
    Cells(Fila + nIteracion, 3).Value = Po
    Cells(Fila + nIteracion, 7).Value = Error

    If Error < Tolerancia Then
        
        Cells(Fila + nIteracion + 2, 2).Value = "La raiz se encontro en la " & nIteracion & " iteracion, con un valor de " & p
    MsgBox "SE ECONTRO LA APROXIMACION A LA RAIZ", vbInformation, "MSC. ING. RENALDO GIRON A."
    Else
        If nIteracion < maxIteracion Then
            Po = p
            Steffensen_AR
        Else
            Cells(Fila + nIteracion + 2, 2).Value = "La ecuacion no converge en las iteraciones solicitadas (" & maxIteracion & ")"
         MsgBox "EL METODO FRACASO, HAY QUE HACER MAS ITERACIONES O CAMBIAR EL VALOR DE PUNTO DE ARRANQUE", vbInformation, "MSC. ING. RENALDO GIRON A."
        End If
    End If
End Sub
Sub limpiar()
    Range("B8:G109").Clear
    Range("V8:W12").Clear
    nIteracion = 0
End Sub
Sub inicio_steffenssen()
    Range("B8:D108").Value = ""
    ParametrosIniciales
    nIteracion = 0
    Steffensen_AR
End Sub

