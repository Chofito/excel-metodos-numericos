Attribute VB_Name = "muller_AR"
Public x0, x1, x2, fx1, fx2, fx0 As Double
Public Tolerancia, Error As Double
Public h, h1, h2, g1, g2, d, DD, b, p As Double
Public maxIteracion, nIteracion, Fila, i As Integer
Public Formula As String

Private Sub ParametrosIniciales()
    x0 = Cells(3, 5).Value
    x1 = Cells(4, 5).Value
    x2 = Cells(5, 5).Value
    Tolerancia = Cells(6, 5).Value
    maxIteracion = Cells(7, 5).Value
    Fila = 9
End Sub

Private Function f(ByVal X As Double) As Double
    ' Funcion para evaluar la ecuacion analizada
    Dim Ecuacion As String
    Ecuacion = Cells(2, 5).Value
    
    Formula = Replace(Ecuacion, "x", X)
    
    Formula = Replace(Formula, " ", "")
    Formula = Replace(Formula, "--", "+")
    Formula = Replace(Formula, "+-", "-")
    Formula = Replace(Formula, "-+", "-")
    
    f = Evaluate(Formula)
End Function

Sub Muller()
    nIteracion = nIteracion + 1
    
    h1 = x1 - x0
    h2 = x2 - x1
    fx1 = f(x1)
    fx2 = f(x2)
    fx0 = f(x0)
    g1 = (f(x1) - f(x0)) / h1
    g2 = (f(x2) - f(x1)) / h2
    d = (g2 - g1) / (h1 + h2)

    
    b = g2 + (h2 * d)
    
    DD = (b ^ 2 - 4 * f(x2) * d) ^ (1 / 2)
    
    If Abs(b - DD) < Abs(b + DD) Then
        Error = b + DD
    Else
        Error = b - DD
    End If
    
    h = (-2 * f(x2)) / Error
    
    p = x2 + h
    
    Cells(Fila + nIteracion, 2).Value = nIteracion
    Cells(Fila + nIteracion, 6).Value = p
    Cells(Fila + nIteracion, 11).Value = Abs(h)
    Cells(Fila + nIteracion, 3).Value = x0
    Cells(Fila + nIteracion, 4).Value = x1
    Cells(Fila + nIteracion, 5).Value = x2
    Cells(Fila + nIteracion, 7).Value = f(x0)
    Cells(Fila + nIteracion, 8).Value = f(x1)
    Cells(Fila + nIteracion, 9).Value = f(x2)
    Cells(Fila + nIteracion, 10).Value = f(p)


    If Abs(h) > Tolerancia Then
        If nIteracion < maxIteracion Then
            x0 = x1
            x1 = x2
            x2 = p
            Muller
        Else
            Cells(Fila + nIteracion + 2, 2).Value = "La ecuacion no converge en las iteraciones solicitadas (" & maxIteracion & ")"
        MsgBox "EL METODO FRACASO, HAY QUE HACER MAS ITERACIONES O HAY QUE CAMBIAR LOS DATOS INICIALES DE ARRANQUE ", vbInformation, "MSC. ING. RENALDO GIRON A."
        End If
    Else
        Cells(Fila + nIteracion + 2, 2).Value = "La raiz se encontro en la " & nIteracion & " iteracion, con un valor de " & p
    MsgBox "SE ECONTRO LA APROXIMACION A LA RAIZ", vbInformation, "MSC. ING. RENALDO GIRON A."
    End If
End Sub

Sub PrincipalMuller()
    Range("B10:D110").Value = ""
    ParametrosIniciales
    nIteracion = 0
    Muller
End Sub
Sub limpiar_muller()
    Range("B10:L109").Clear
    Range("V8:W12").Clear
    nIteracion = 0
End Sub


