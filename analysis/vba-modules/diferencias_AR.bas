Attribute VB_Name = "diferencias_AR"
Public x0, x1, x2, X3, x4, Pox, Pox1 As Double
Public fx0, fx1, fx2, fx3, fx4 As Double
Public f1, f2, f3, f4, f5, f6, f7, f8, f9, f10 As Double

Public hacer1 As Boolean

Private Sub ParametrosIniciales()
    Dim i, dai As Integer
    
    
    dai = Cells(4, 6).Value
    
    If Cells(3, 6).Value = 2 Then
    
    x0 = Cells(8, 3).Value
    x1 = Cells(8, 4).Value
    fx0 = Cells(9, 3).Value
    fx1 = Cells(9, 4).Value
    End If
    
    If Cells(3, 6).Value = 3 Then
    
    x0 = Cells(8, 3).Value
    x1 = Cells(8, 4).Value
    x2 = Cells(8, 5).Value
    fx0 = Cells(9, 3).Value
    fx1 = Cells(9, 4).Value
    fx2 = Cells(9, 5).Value
    End If
    
    If Cells(3, 6).Value = 4 Then
    
    x0 = Cells(8, 3).Value
    x1 = Cells(8, 4).Value
    x2 = Cells(8, 5).Value
    X3 = Cells(8, 6).Value
    fx0 = Cells(9, 3).Value
    fx1 = Cells(9, 4).Value
    fx2 = Cells(9, 5).Value
    fx3 = Cells(9, 6).Value
    End If
    
    If Cells(3, 6).Value = 5 Then
    
    x0 = Cells(8, 3).Value
    x1 = Cells(8, 4).Value
    x2 = Cells(8, 5).Value
    X3 = Cells(8, 6).Value
    x4 = Cells(8, 7).Value
    fx0 = Cells(9, 3).Value
    fx1 = Cells(9, 4).Value
    fx2 = Cells(9, 5).Value
    fx3 = Cells(9, 6).Value
    fx4 = Cells(9, 7).Value
    End If
    
     
End Sub

Sub DiferenciasDivididas()


    If Cells(3, 6).Value = 2 Then
    
    f1 = (fx1 - fx0) / (x1 - x0)
    Cells(14, 2).Value = x0
    Cells(15, 2).Value = x1
    Cells(14, 3).Value = fx0
    Cells(15, 3).Value = fx1
    Cells(15, 4).Value = f1
    End If
    
    If Cells(3, 6).Value = 3 Then
    
    f1 = (fx1 - fx0) / (x1 - x0)
    f2 = (fx2 - fx1) / (x2 - x1)
    f5 = (f2 - f1) / (x2 - x0)
    Cells(14, 2).Value = x0
    Cells(15, 2).Value = x1
    Cells(16, 2).Value = x2
    Cells(14, 3).Value = fx0
    Cells(15, 3).Value = fx1
    Cells(16, 3).Value = fx2
    Cells(15, 4).Value = f1
    Cells(16, 4).Value = f2
    Cells(16, 5).Value = f5
    End If
    
    If Cells(3, 6).Value = 4 Then
    
    f1 = (fx1 - fx0) / (x1 - x0)
    f2 = (fx2 - fx1) / (x2 - x1)
    f3 = (fx3 - fx2) / (X3 - x2)
    
    f5 = (f2 - f1) / (x2 - x0)
    f6 = (f3 - f2) / (X3 - x1)
    f8 = (f6 - f5) / (X3 - x0)
    Cells(14, 2).Value = x0
    Cells(15, 2).Value = x1
    Cells(16, 2).Value = x2
    Cells(17, 2).Value = X3
    Cells(14, 3).Value = fx0
    Cells(15, 3).Value = fx1
    Cells(16, 3).Value = fx2
    Cells(17, 3).Value = fx3
    Cells(15, 4).Value = f1
    Cells(16, 4).Value = f2
    Cells(17, 4).Value = f3
    Cells(16, 5).Value = f5
    Cells(17, 5).Value = f6
    Cells(17, 6).Value = f8
    End If
    
    If Cells(3, 6).Value = 5 Then
    
    f1 = (fx1 - fx0) / (x1 - x0)
    f2 = (fx2 - fx1) / (x2 - x1)
    f3 = (fx3 - fx2) / (X3 - x2)
    f4 = (fx4 - fx3) / (x4 - X3)
    f5 = (f2 - f1) / (x2 - x0)
    f6 = (f3 - f2) / (X3 - x1)
    f7 = (f4 - f3) / (x4 - x2)
    f8 = (f6 - f5) / (X3 - x0)
    f9 = (f7 - f6) / (x4 - x1)
    f10 = (f9 - f8) / (x4 - x0)
    Cells(14, 2).Value = x0
    Cells(15, 2).Value = x1
    Cells(16, 2).Value = x2
    Cells(17, 2).Value = X3
    Cells(18, 2).Value = x4
    Cells(14, 3).Value = fx0
    Cells(15, 3).Value = fx1
    Cells(16, 3).Value = fx2
    Cells(17, 3).Value = fx3
    Cells(18, 3).Value = fx4
    Cells(15, 4).Value = f1
    Cells(16, 4).Value = f2
    Cells(17, 4).Value = f3
    Cells(18, 4).Value = f4
    Cells(16, 5).Value = f5
    Cells(17, 5).Value = f6
    Cells(18, 5).Value = f7
    Cells(17, 6).Value = f8
    Cells(18, 6).Value = f9
    Cells(18, 7).Value = f10
    End If

       
    EscribeSolucion (Valor)
End Sub

Sub EscribeSolucion(ByVal Progresivas As String)
    Dim Solucion1, Solucionr As String
    Dim ValorSolucion, Valorsolucionr As String
    
dai = Cells(4, 6).Value
   
    If Cells(3, 6).Value = 2 Then
    
        Solucion1 = "P(x) = " & fx0 & " + " & f1 & "(x - " & x0 & ") "
        ValorSolucion1 = fx0 & " + " & f1 & "*(" & dai & " - " & x0 & ") "
        Solucionr = "P(x) = " & fx1 & " + " & f1 & "(x - " & x1 & ") "
        Valorsolucionr1 = fx1 & " + " & f1 & "*(" & dai & " - " & x1 & ") "
        
        Pox = Evaluate(ValorSolucion1)
        Pox1 = Evaluate(ValorSolucion1)
   
    Cells(25, 2).Value = Solucion1
    Cells(26, 2).Value = "P(" & dai & ") = " & Pox1
       
    
    Cells(21, 2).Value = Solucionr
    Cells(22, 2).Value = "P(" & dai & ") = " & Pox
    End If
        
    If Cells(3, 6).Value = 3 Then
        Solucion1 = "P(x) = " & fx0 & " + " & f1 & "(x - " & x0 & ") + " & f5 & "(x - " & x0 & ")(x - " & x1 & ") "
        ValorSolucion1 = fx0 & " + " & f1 & "*(" & dai & " - " & x0 & ") + " & f5 & "*(" & dai & " - " & x0 & ")*(" & dai & " - " & x1 & ")"
        Solucionr = "P(x) = " & fx2 & " + " & f2 & "(x - " & x2 & ") + " & f5 & "(x - " & x2 & ")(x - " & x1 & ") "
        Valorsolucionr1 = fx0 & " + " & f2 & "*(" & dai & " - " & x2 & ") + " & f5 & "*(" & dai & " - " & x2 & ")*(" & dai & " - " & x1 & ")"
    
    Pox = Evaluate(ValorSolucion1)
        Pox1 = Evaluate(ValorSolucion1)
   
    Cells(25, 2).Value = Solucion1
    Cells(26, 2).Value = "P(" & dai & ") = " & Pox1
       
    
    Cells(21, 2).Value = Solucionr
    Cells(22, 2).Value = "P(" & dai & ") = " & Pox
    
       
    
    End If
        
    If Cells(3, 6).Value = 4 Then
        Solucion1 = "P(x) = " & fx0 & " + " & f1 & "(x - " & x0 & ") + " & f5 & "(x - " & x0 & ")(x - " & x1 & ") + " & f8 & "(x - " & x0 & ")(x - " & x1 & ")(x - " & x2 & ")"
        ValorSolucion1 = fx0 & " + " & f1 & "*(" & dai & " - " & x0 & ") + " & f5 & "*(" & dai & " - " & x0 & ")*(" & dai & " - " & x1 & ") + " & f8 & "*(" & dai & " - " & x0 & ")*(" & dai & " - " & x1 & ")*(" & dai & " - " & x2 & ")"
        Solucionr = "P(x) = " & fx3 & " + " & f3 & "(x - " & X3 & ") + " & f6 & "(x - " & X3 & ")(x - " & x2 & ") + " & f8 & "(x - " & X3 & ")(x - " & x2 & ")(x - " & x1 & ")"
        Valorsolucionr1 = fx3 & " + " & f3 & "*(" & dai & " - " & X3 & ") + " & f6 & "*(" & dai & " - " & X3 & ")*(" & dai & " - " & x2 & ") + " & f8 & "*(" & dai & " - " & X3 & ")*(" & dai & " - " & x2 & ")*(" & dai & " - " & x1 & ")"
    
   Pox = Evaluate(ValorSolucion1)
        Pox1 = Evaluate(ValorSolucion1)
   
    Cells(25, 2).Value = Solucion1
    Cells(26, 2).Value = "P(" & dai & ") = " & Pox1
       
    
    Cells(21, 2).Value = Solucionr
    Cells(22, 2).Value = "P(" & dai & ") = " & Pox
     
    
    End If
        
    If Cells(3, 6).Value = 5 Then
       Solucion1 = "P(x) = " & fx0 & " + " & f1 & "(x - " & x0 & ") + " & f5 & "(x - " & x0 & ")(x - " & x1 & ") + " & f8 & "(x - " & x0 & ")(x - " & x1 & ")(x - " & x2 & ")+ " & f10 & "(x - " & x0 & ")(x - " & x1 & ")(x - " & x2 & ")(x - " & X3 & ")"
       ValorSolucion1 = fx0 & " + " & f1 & "*(" & dai & " - " & x0 & ") + " & f5 & "*(" & dai & " - " & x0 & ")*(" & dai & " - " & x1 & ") + " & f8 & "*(" & dai & " - " & x0 & ")*(" & dai & " - " & x1 & ")*(" & dai & " - " & x2 & ")+ " & f10 & "*(" & dai & " - " & x0 & ")*(" & dai & " - " & x1 & ")*(" & dai & " - " & x2 & ")*(" & dai & " - " & X3 & ")"
       Solucionr = "P(x) = " & fx4 & " + " & f4 & "(x - " & x4 & ") + " & f7 & "(x - " & x4 & ")(x - " & X3 & ") + " & f9 & "(x - " & x4 & ")(x - " & X3 & ")(x - " & x2 & ")+ " & f10 & "(x - " & x4 & ")(x - " & X3 & ")(x - " & x2 & ")(x - " & x1 & ")"
       Valorsolucionr1 = fx4 & " + " & f4 & "*(" & dai & " - " & x4 & ") + " & f7 & "*(" & dai & " - " & x4 & ")*(" & dai & " - " & X3 & ") + " & f9 & "*(" & dai & " - " & x4 & ")*(" & dai & " - " & X3 & ")*(" & dai & " - " & x2 & ")+ " & f10 & "*(" & dai & " - " & x4 & ")*(" & dai & " - " & X3 & ")*(" & dai & " - " & x2 & ")*(" & dai & " - " & x1 & ")"
    
    Pox = Evaluate(ValorSolucion1)
        Pox1 = Evaluate(ValorSolucion1)
   
    Cells(25, 2).Value = Solucion1
    Cells(26, 2).Value = "P(" & dai & ") = " & Pox1
       
    
    Cells(21, 2).Value = Solucionr
    Cells(22, 2).Value = "P(" & dai & ") = " & Pox
    
    
    End If
    
   
    End Sub

Sub PrincipalDiferenciasDivididas()
    Range("B14:g18").Value = ""
    ParametrosIniciales
    DiferenciasDivididas
End Sub
Sub papapapapapapappa()
PrincipalDiferenciasDivididas
End Sub



