Attribute VB_Name = "secante_AR"
Public xActual, xAnterior, xSiguiente As Double
Public fxActual, fxAnterior, Tolerancia, Error As Double
Public maxIteracion, nIteracion, Fila, i, b As Integer
Public Formula As String

Private Sub ParametrosIniciales()
    xActual = Cells(4, 5).Value
    xAnterior = Cells(3, 5).Value
    Tolerancia = Cells(5, 5).Value
    maxIteracion = Cells(6, 5).Value
    Fila = 8
End Sub

Private Function f(ByVal X As Double) As Double
    Dim Ecuacion As String
    Ecuacion = Cells(2, 5).Value
    
    Formula = Replace(Ecuacion, "x", X)
    Formula = Replace(Formula, " ", "")
    Formula = Replace(Formula, "--", "+")
    Formula = Replace(Formula, "+-", "-")
    Formula = Replace(Formula, "-+", "-")

    f = Evaluate(Formula)
End Function

Sub Secante()

    nIteracion = nIteracion + 1
    
    xSiguiente = xActual - ((f(xActual) * (xActual - xAnterior)) / (f(xActual) - f(xAnterior)))
    
    Error = Abs(xSiguiente - xActual)
    
    Cells(Fila + nIteracion, 2).Value = nIteracion
    Cells(Fila + nIteracion, 4).Value = xActual
    Cells(Fila + nIteracion, 3).Value = xAnterior
    Cells(Fila + nIteracion, 5).Value = xSiguiente
    Cells(Fila + nIteracion, 6).Value = Error

    If Error > Tolerancia Then
        If nIteracion < maxIteracion Then
            xAnterior = xActual
            xActual = xSiguiente
            Secante
        Else
            Cells(Fila + nIteracion + 2, 2).Value = "El metodo fracaso con las iteraciones solicitadas (" & maxIteracion & ")"
        MsgBox "EL METODO FRACASO, HAY QUE HACER MAS ITERACIONES O CAMBIAR EL INTERVALO", vbInformation, "Msc. RENALDO GIRON A."
        End If
    Else
        Cells(Fila + nIteracion + 2, 2).Value = "La raiz se encontro en la " & nIteracion & " iteracion, con un valor de " & xSiguiente
    MsgBox "SE ECONTRO LA APROXIMACION A LA RAIZ", vbInformation, "MSC. RENALDO GIRON A."
    End If

End Sub

Sub inicio_secante()
    Range("B9:F109").Value = ""
    ParametrosIniciales
    nIteracion = 0
    Secante
End Sub
Sub limpiar()
    Range("B9:F109").Clear
    Range("V8:W12").Clear
End Sub


