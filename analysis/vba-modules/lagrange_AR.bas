Attribute VB_Name = "lagrange_AR"
Public maxN, i As Integer
Dim Po As Double

Private Sub ParametrosIniciales()
    maxN = Cells(3, 4).Value
    Po = Cells(4, 4).Value
End Sub


Function fXn(ByVal nfx As Integer)
    fXn = Cells(9, 3 + nfx).Value
End Function

Function Xn(ByVal nx As Integer)
    Xn = Cells(8, 3 + nx).Value
End Function

Function Lnx(ByVal k As Integer, ByVal n As Integer) As String
    Dim FuncionLn, NumeradorLn, DenominadorLn As String
    Dim i As Integer 'Definir indice de cada X
    
    NumeradorLn = ""
    DenominadorLn = ""
    
    For i = 0 To n
        If i <> k Then
            NumeradorLn = NumeradorLn & "(x - x" & i & ")"
            DenominadorLn = DenominadorLn & "(x" & k & " - x" & i & ")"
            If i < n Then
                NumeradorLn = NumeradorLn & "*"
                DenominadorLn = DenominadorLn & "*"
            End If
        End If
    Next
    
    FuncionLn = "(" & NumeradorLn & ")/(" & DenominadorLn & ")"
    
    Lnx = FuncionLn
    
End Function

Function Pk(ByVal kP As Integer)
    Dim Pactual As String
    
    Dim nP As Integer
    
    nP = maxN
    
    Pactual = "(" & Lnx(kP, nP) & "*" & fXn(kP) & ")"
    
    Pk = Pactual
End Function
Function Pka(ByVal kP As Integer)
    Dim Pactual As String
    
    Dim nP As Integer
    
    nP = maxN
    
    Pactual = "(" & Lnx(kP, nP) & "*" & fXn(kP) & ")"
    
    Pka = Pactual
End Function
Private Function f(ByVal X As Double) As Double
    Dim Ecuacion As String
    Ecuacion = Cells(1, 1).Value
    Formula = Replace(Ecuacion, "x", X)
    Formula = Replace(Formula, " ", "")
    
    f = Evaluate(Formula)
End Function

Sub Lagrange()
    Dim kL, nL, MM, i As Integer
    Dim Polinomio, mmm, XsubN As String
    Dim Aproximacion, Ap As Double
    
    Dim kLa, nLa As Integer
    Dim Polinomioa, XsubNa As String
    Dim Aproximaciona, Apa As Double
    
    If Cells(3, 4).Value = 1 Then
    Cells(17, 3).Value = (((Cells(4, 4) - Cells(8, 4))) / ((Cells(8, 3) - Cells(8, 4))) * Cells(9, 3)) + (((Cells(4, 4) - Cells(8, 3))) / ((Cells(8, 4) - Cells(8, 3))) * Cells(9, 4))
    End If
         If Cells(3, 4).Value = 2 Then
        Cells(17, 3).Value = (((Cells(4, 4) - Cells(8, 4)) * (Cells(4, 4) - Cells(8, 5))) / ((Cells(8, 3) - Cells(8, 4)) * (Cells(8, 3) - Cells(8, 5))) * Cells(9, 3)) + (((Cells(4, 4) - Cells(8, 3)) * (Cells(4, 4) - Cells(8, 5))) / ((Cells(8, 4) - Cells(8, 3)) * (Cells(8, 4) - Cells(8, 5))) * Cells(9, 4)) + (((Cells(4, 4) - Cells(8, 3)) * (Cells(4, 4) - Cells(8, 4))) / ((Cells(8, 5) - Cells(8, 3)) * (Cells(8, 5) - Cells(8, 4))) * Cells(9, 5))
         End If
            If Cells(3, 4).Value = 3 Then
        
              Cells(17, 3).Value = (((Cells(4, 4) - Cells(8, 4)) * (Cells(4, 4) - Cells(8, 5)) * (Cells(4, 4) - Cells(8, 6))) / ((Cells(8, 3) - Cells(8, 4)) * (Cells(8, 3) - Cells(8, 5)) * (Cells(8, 3) - Cells(8, 6))) * Cells(9, 3)) + (((Cells(4, 4) - Cells(8, 3)) * (Cells(4, 4) - Cells(8, 5)) * (Cells(4, 4) - Cells(8, 6))) / ((Cells(8, 4) - Cells(8, 3)) * (Cells(8, 4) - Cells(8, 5)) * (Cells(8, 4) - Cells(8, 6))) * Cells(9, 4)) + (((Cells(4, 4) - Cells(8, 3)) * (Cells(4, 4) - Cells(8, 4)) * (Cells(4, 4) - Cells(8, 6))) / ((Cells(8, 5) - Cells(8, 3)) * (Cells(8, 5) - Cells(8, 4)) * (Cells(8, 5) - Cells(8, 6))) * Cells(9, 5)) + (((Cells(4, 4) - Cells(8, 3)) * (Cells(4, 4) - Cells(8, 4)) * (Cells(4, 4) - Cells(8, 5))) / ((Cells(8, 6) - Cells(8, 3)) * (Cells(8, 6) - Cells(8, 4)) * (Cells(8, 6) - Cells(8, 5))) * Cells(9, 6))
             End If
    
    
    
    Polinomio = ""
    
    For kL = 0 To maxN
        Polinomio = Polinomio & Pk(kL)
        If kL < maxN Then Polinomio = Polinomio & " + "
    
    Next
    
    Polinomio = Replace(Polinomio, "*)", ")")
    Cells(11, 3).Value = "P(x) = " & Polinomio
    'Cells(1, 1).Value = Polinomio
    For nL = 0 To maxN
        XsubN = "x" & nL
        Polinomio = Replace(Polinomio, XsubN, Xn(nL))
    Next
        'Cells(1, 1).Value = Replace(Polinomio, "x", 0)

    Cells(13, 3).Value = "P(x) = " & Polinomio
    
    Polinomio = Replace(Polinomio, "x", Po) ' Polinomio con todos los valores sustituidos
    
    Cells(15, 3).Value = "P(x) = " & Polinomio
 
    Aproximacion = Evaluate(Polinomio)
    
       
    
    For i = 0 To 4
    
       For kL = 0 To maxN
        Polinomio = Polinomioa & Pk(kL)
        If kL < maxN Then Polinomio = Polinomio & " + "
       Next
    
    Polinomio = Replace(Polinomio, "*)", ")")
    'Cells(11, 3).Value = "P(x) = " & Polinomioa
    'Cells(1, 1).Value = Polinomioa
    For nL = 0 To maxN
        XsubN = "x" & nL
        Polinomio = Replace(Polinomio, XsubN, Xn(nL))
    Next
        'Cells(1, 1).Value = Replace(Polinomioa, "x", 0)

    'Cells(13, 3).Value = "P(x) = " & Polinomioa
    
    Polinomio = Replace(Polinomio, "x", i)
    ' Polinomio con todos los valores sustituidos
    
    'Cells(15, 3).Value = "P(x) = " & Polinomioa
 
    Aproximacion = Evaluate(Polinomio)
   Next
End Sub

Sub PrincipalLagrange()
    Range("C11:C13").Value = ""
    ParametrosIniciales
    Lagrange
End Sub


