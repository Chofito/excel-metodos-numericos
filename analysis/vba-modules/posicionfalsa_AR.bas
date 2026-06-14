Attribute VB_Name = "posicionfalsa_AR"
Public xActual, xAnterior, xSiguiente1, xSiguiente2 As Double
Public fxActual, fxAnterior, Tolerancia, Error, errorsecante As Double
Public maxIteracion, nIteracion, Fila, i As Integer
Public Formula As String

Private Sub ParametrosIniciales()
    xActual = Cells(4, 5).Value
    xAnterior = Cells(3, 5).Value
    Tolerancia = Cells(5, 5).Value
    maxIteracion = Cells(6, 5).Value
    
    
    xSiguiente1 = xActual - ((f(xActual) * (xActual - xAnterior)) / (f(xActual) - f(xAnterior)))
    errorsecante = Abs(xActual - xSiguiente1)
    Cells(9, 2).Value = 1
    Cells(9, 4).Value = xActual
    Cells(9, 3).Value = xAnterior
    Cells(9, 5).Value = xSiguiente1
    Cells(9, 6).Value = errorsecante
    xAnterior = xSiguiente1
    Fila = 9
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

Sub PosicionFalsa()
        
    nIteracion = nIteracion + 1
    xSiguiente2 = xActual - ((f(xActual) * (xActual - xAnterior)) / (f(xActual) - f(xAnterior)))
    
    Error = Abs(xAnterior - xSiguiente2)
    
    Cells(Fila + nIteracion, 2).Value = nIteracion + 1
    Cells(Fila + nIteracion, 4).Value = xActual
    Cells(Fila + nIteracion, 3).Value = xAnterior
    Cells(Fila + nIteracion, 5).Value = xSiguiente2
    Cells(Fila + nIteracion, 6).Value = Error

    If Error > Tolerancia Then
        If nIteracion < maxIteracion Then
            xAnterior = xSiguiente2
            PosicionFalsa
        Else
             
            Cells(Fila + nIteracion + 2, 2).Value = "El metodo fracaso con las iteraciones solicitadas (" & maxIteracion & ")"
        MsgBox "EL METODO FRACASO, HAY QUE HACER MAS ITERACIONES O CAMBIAR EL INTERVALO", vbInformation, "MSC. ING. RENALDO GIRON A."
        End If
    Else
                 
        Cells(Fila + nIteracion + 2, 2).Value = "La raiz se encontro en la " & nIteracion & " iteracion, con un valor de " & xSiguiente2
    MsgBox "SE ECONTRO LA APROXIMACION A LA RAIZ", vbInformation, "MSC. RENALDO GIRON A."
    End If
End Sub

Sub inicio_posicionfalsa()
    Range("B9:F109").Value = ""
    ParametrosIniciales
    nIteracion = 0
    PosicionFalsa
End Sub
Sub limpiar()
    Range("B9:G109").Clear
    Range("V8:W12").Clear
    nIteracion = 0
End Sub


