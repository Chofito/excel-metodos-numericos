Attribute VB_Name = "biseccion_AR"
Public a, b, i, a1, a2, b1, p, ba, fdp, Tolerancia As Double
Public bandera, n, nIteracion, Fila As Integer
Public Formula As String
Private Sub Datos_Iniciales()
    b = Cells(4, 7).Value
    a = Cells(3, 7).Value
    Tolerancia = Cells(5, 7).Value
    n = Cells(6, 7).Value
    Fila = 8
If f(a) < 0 And f(b) > 0 Or f(a) > 0 And f(b) < 0 Then
MsgBox "EL METODO FUNCIONA PORQUE HAY CAMBIO DE SIGNO" & vbCrLf & "f(a)= " + Str(f(a)) & vbCrLf & "f(b)= " + Str(f(b)), vbInformation, "Msc. RENALDO GIRON ALVARADO / MATEMATICA APLICADA 3"
bandera = 1
Else
bandera = 0
    Range("B9:J109").Clear
    MsgBox "EL METODO FRACASO PORQUE NO HAY CAMBIO DE SIGNO", vbInformation, "Msc. RENALDO GIRON ALVARADO / MATEMATICA APLICADA 3"
    
End If

End Sub
Private Function f(ByVal X As Double) As Double
    Dim Ecuacion As String
    Ecuacion = Cells(2, 7).Value
        
    Formula = Replace(Ecuacion, "x", X)
    Formula = Replace(Formula, " ", "")
    Formula = Replace(Formula, "--", "+")
    Formula = Replace(Formula, "+-", "-")
    Formula = Replace(Formula, "-+", "-")
    
    f = Evaluate(Formula)
End Function
Sub biseccion_AR()

    nIteracion = nIteracion + 1

    ba = (b - a) / 2
    p = a + ba
    fdp = f(p)
    
    Cells(Fila + nIteracion, 2).Value = nIteracion
    Cells(Fila + nIteracion, 3).Value = a
    Cells(Fila + nIteracion, 4).Value = b
    Cells(Fila + nIteracion, 5).Value = p
    Cells(Fila + nIteracion, 6).Value = f(a)
    Cells(Fila + nIteracion, 7).Value = f(b)
    Cells(Fila + nIteracion, 8).Value = f(p)
    Cells(Fila + nIteracion, 9).Value = f(a) * f(p)
    Cells(Fila + nIteracion, 10).Value = ba

    If (ba < Tolerancia) Or (fdp = 0) Then
                
             Cells(Fila + nIteracion + 2, 5).Value = "La raiz se encontro en la " & nIteracion & " iteracion, con un valor de " & p
    MsgBox "SE ECONTRO LA APROXIMACION A LA RAIZ", vbInformation, "MSC. ING. RENALDO GIRON A."
    Else
        If nIteracion < n Then
            If f(a) * fdp > 0 Then
                a = p
            Else
                b = p
            End If
            biseccion_AR
        Else
        
            Cells(Fila + nIteracion + 2, 2).Value = "el metodo fracaso en la iteracion (" & n & ")"
        MsgBox "EL METODO FRACASO, HAY QUE HACER MAS ITERACIONES O CAMBIAR EL INTERVALO", vbInformation, "MSC. ING. RENALDO GIRON A."
        End If
    End If
End Sub
Sub inicio_biseccion()
    Range("B9:J109").Value = ""
    Datos_Iniciales
    nIteracion = 0
    biseccion_AR
End Sub
Sub limpiar()
    Range("B9:J109").Clear
    Range("V8:W12").Clear
    nIteracion = 0
End Sub



