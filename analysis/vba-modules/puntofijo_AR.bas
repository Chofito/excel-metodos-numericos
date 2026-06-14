Attribute VB_Name = "puntofijo_AR"
Public Po, P1, Error, Tolerancia As Double
Public maxIteracion, nIteracion, Fila, i, i2 As Integer
Public Formula, Formu As String
Private Sub ParametrosIniciales()
    Po = Cells(4, 6).Value
    Tolerancia = Cells(5, 6).Value
    maxIteracion = Cells(6, 6).Value
    Fila = 8
End Sub
Private Function g(ByVal X As Double) As Double
    Dim Ecuacion As String
    Ecuacion = Cells(3, 6).Value
    Formula = Replace(Ecuacion, "x", X)
    Formula = Replace(Formula, " ", "")
    Formula = Replace(Formula, "--", "+")
    Formula = Replace(Formula, "+-", "-")
    Formula = Replace(Formula, "-+", "-")
        
    g = Evaluate(Formula)
End Function

Sub puntofijo()
    nIteracion = nIteracion + 1


    P1 = g(Po)
        Error = Abs(P1 - Po)
    
    Cells(Fila + nIteracion, 2).Value = nIteracion
    Cells(Fila + nIteracion, 4).Value = P1
    Cells(Fila + nIteracion, 5).Value = Error
    Cells(Fila + nIteracion, 3).Value = Po
    
    If Error < Tolerancia Then
     
        Cells(Fila + nIteracion + 2, 2).Value = "La raiz se encontro en la " & nIteracion & " iteracion, con un valor de " & P1
  MsgBox "SE ECONTRO LA APROXIMACION A LA RAIZ", vbInformation, "MSC. ING. RENALDO GIRON A."
    Else
        If nIteracion < maxIteracion Then
            Po = P1
            puntofijo
        Else
            Cells(Fila + nIteracion + 2, 2).Value = "El metodo fracaso con las iteraciones solicitadas (" & maxIteracion & ")"
        MsgBox "EL METODO FRACASO, HAY QUE HACER MAS ITERACIONES O CAMBIAR EL PUNTO DE ARRANQUE", vbInformation, "MSC. ING. RENALDO GIRON A."
        End If
    End If
End Sub
Sub inicio_puntofijo()
    Range("B9:E108").Value = ""
    ParametrosIniciales
    nIteracion = 0
    puntofijo
End Sub

Sub limpiar()
    Range("B9:E109").Clear
    Range("T8:W12").Clear
    nIteracion = 0
End Sub
