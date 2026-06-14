Attribute VB_Name = "Hoja9"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True
Public x0, x1, x2, X3, x4, Po, no, Pox As Double
Public fx0, fx1, fx2, fx3, fx4 As Double
Public f1, f2, f3, f4, f5, f6, f7, f8, f9, f10 As Double
Public Hasx4 As Boolean

Private Sub ParametrosIniciales()
    Dim i As Integer
    Dim Instruccion1, Instruccion2 As String
    
    no = Cells(4, 6).Value
    Po = Cells(6, 6).Value
    x0 = Cells(10, 3).Value
    x1 = Cells(10, 4).Value
    x2 = Cells(10, 5).Value
    X3 = Cells(10, 6).Value
    x4 = Cells(10, 7).Value
    fx4 = Cells(11, 7).Value
    fx0 = Cells(11, 3).Value
    fx1 = Cells(11, 4).Value
    fx2 = Cells(11, 5).Value
    fx3 = Cells(11, 6).Value
End Sub

Sub Neville()
    If no = 2 Then
    f1 = (fx0 * (Po - x1) - fx1 * (Po - x0)) / (x0 - x1)
    Cells(14, 2).Value = x0
    Cells(15, 2).Value = x1
    Cells(14, 3).Value = fx0
    Cells(15, 3).Value = fx1
    Cells(15, 4).Value = f1
    
    Cells(21, 2).Value = "LA APROXIMACION POR NEVILLE ES " & f1 & ""
        
    End If
    
    If no = 3 Then
    f1 = (fx0 * (Po - x1) - fx1 * (Po - x0)) / (x0 - x1)
    f2 = (fx1 * (Po - x2) - fx2 * (Po - x1)) / (x1 - x2)
    f5 = (f1 * (Po - x2) - f2 * (Po - x0)) / (x0 - x2)
    
    Cells(14, 2).Value = x0
    Cells(15, 2).Value = x1
    Cells(16, 2).Value = x2
    Cells(14, 3).Value = fx0
    Cells(15, 3).Value = fx1
    Cells(16, 3).Value = fx2
    Cells(15, 4).Value = f1
    Cells(16, 4).Value = f2
    Cells(16, 5).Value = f5
    Cells(21, 2).Value = "LA APROXIMACION POR NEVILLE ES " & f5 & ""
        
    End If
    
    If no = 4 Then
    f1 = (fx0 * (Po - x1) - fx1 * (Po - x0)) / (x0 - x1)
    f2 = (fx1 * (Po - x2) - fx2 * (Po - x1)) / (x1 - x2)
    f3 = (fx2 * (Po - X3) - fx3 * (Po - x2)) / (x2 - X3)
    f5 = (f1 * (Po - x2) - f2 * (Po - x0)) / (x0 - x2)
    f6 = (f2 * (Po - X3) - f3 * (Po - x1)) / (x1 - X3)
    f8 = (f5 * (Po - X3) - f6 * (Po - x0)) / (x0 - X3)
    
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
    
    Cells(21, 2).Value = "LA APROXIMACION POR NEVILLE ES " & f8 & ""
        
    End If
    
    If no = 5 Then
    f1 = (fx0 * (Po - x1) - fx1 * (Po - x0)) / (x0 - x1)
    f2 = (fx1 * (Po - x2) - fx2 * (Po - x1)) / (x1 - x2)
    f3 = (fx2 * (Po - X3) - fx3 * (Po - x2)) / (x2 - X3)
    f4 = (fx3 * (Po - x4) - fx4 * (Po - X3)) / (X3 - x4)
    f5 = (f1 * (Po - x2) - f2 * (Po - x0)) / (x0 - x2)
    f6 = (f2 * (Po - X3) - f3 * (Po - x1)) / (x1 - X3)
    f7 = (f3 * (Po - x4) - f4 * (Po - x2)) / (x2 - x4)
    f8 = (f5 * (Po - X3) - f6 * (Po - x0)) / (x0 - X3)
    f9 = (f6 * (Po - x4) - f7 * (Po - x1)) / (x1 - x4)
    f10 = (f8 * (Po - x4) - f9 * (Po - x0)) / (x0 - x4)
    
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
    
    
    Cells(21, 2).Value = "LA APROXIMACION POR NEVILLE ES " & f10 & ""
        
    End If
    
    
    
End Sub

Sub PrincipalNeville()
    Range("B14:G18").Value = ""
    ParametrosIniciales
    Neville
End Sub
Sub limpiar_neville()
    Range("B14:G18").Clear
End Sub




