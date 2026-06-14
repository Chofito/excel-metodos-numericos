Attribute VB_Name = "Hoja16"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True
Public V1, V2, V3, Vs1, Vs2, Vs3, Error As Double
Public Tolerancia, E1, E2, E3 As Double
Public maxIteracion, nIteracion, Fila As Integer
Public Formula As String
Const Pi As Double = 3.14159265358979

Private Sub ParametrosIniciales()
    
    Tolerancia = Cells(8, 7).Value
    maxIteracion = Cells(7, 7).Value
    
    V1 = Cells(6, 3).Value
    V2 = Cells(7, 3).Value
    If Cells(8, 3).Value <> "" Then
        V3 = Cells(8, 3).Value
    Else
        V3 = 0
    End If
    
    Fila = 10
    
End Sub

Private Function f(ByVal x1 As Double, ByVal x2 As Double, ByVal X3 As Double, ByVal i As Integer) As Double
    ' Funcion para evaluar la ecuacion analizada
    Dim Ecuacion As String
    Dim FilaEc As Integer
    
    FilaEc = 1 + i

    Ecuacion = Cells(FilaEc, 3).Value
    
    Formula = Replace(Ecuacion, "x1", x1)
    Formula = Replace(Formula, "x2", x2)
    Formula = Replace(Formula, "x3", X3)
    Formula = Replace(Formula, "Pi", Pi)
    
    Formula = Replace(Formula, " ", "")
    Formula = Replace(Formula, "--", "+")
    Formula = Replace(Formula, "+-", "-")
    Formula = Replace(Formula, "-+", "-")
    
    f = Evaluate(Formula)
End Function

Sub PuntoFijoNL()
    nIteracion = nIteracion + 1
    
    
    Vs1 = f(V1, V2, V3, 1)
    Vs2 = f(V1, V2, V3, 2)
    If Cells(8, 3).Value <> "" Then Vs3 = f(V1, V2, V3, 3)
        
    E1 = Abs(Vs1 - V1)
    E2 = Abs(Vs2 - V2)
    E3 = Abs(Vs3 - V3)
      
      
    If E1 >= E2 Then
        If E2 >= E3 Then
            Error = E1
        Else
            If E1 >= E3 Then
                Error = E1
            Else
                Error = E3
            End If
        End If
    Else
        If E2 >= E3 Then
            If E1 >= E3 Then
                Error = E2
            Else
                Error = E2
            End If
        Else
            Error = E3
        End If
    End If
   Cells(11, 2).Value = 0
   Cells(11, 3).Value = Cells(6, 3).Value
   Cells(11, 4).Value = Cells(7, 3).Value
   If Cells(8, 3).Value <> "" Then
   Cells(11, 5).Value = Cells(8, 3).Value
   End If
   Cells(11, 6).Value = "---"
   Cells(11, 7).Value = "---"
   Cells(11, 8).Value = "---"
   Cells(11, 9).Value = "---"
    Cells(Fila + nIteracion + 1, 2).Value = nIteracion
    Cells(Fila + nIteracion + 1, 3).Value = Vs1
    Cells(Fila + nIteracion + 1, 4).Value = Vs2
    Cells(Fila + nIteracion + 1, 6).Value = E1
    Cells(Fila + nIteracion + 1, 7).Value = E2
    
    If Cells(8, 3).Value <> "" Then
        Cells(Fila + nIteracion + 1, 5).Value = Vs3
        Cells(Fila + nIteracion + 1, 8).Value = E3
    Else
        Cells(Fila + nIteracion + 1, 5).Value = "'---"
        Cells(Fila + nIteracion + 1, 8).Value = "'---"
    End If
    
    Cells(Fila + nIteracion + 1, 9).Value = Error
    
    If Error > Tolerancia Then
        If nIteracion < maxIteracion Then
            V1 = Vs1
            V2 = Vs2
            V3 = Vs3
            PuntoFijoNL
        Else
            Cells(Fila + nIteracion + 3, 2).Value = "La ecuacion no converge en las iteraciones solicitadas (" & maxIteracion & ")"
        End If
    Else
        Cells(Fila + nIteracion + 3, 2).Value = "La solucion se encontro en la " & nIteracion & " iteracion, con un valor de: X1 = " & Vs1 & ", X2 = " & Vs2
        If Cells(8, 3).Value <> "" Then Cells(Fila + nIteracion + 3, 2).Value = Cells(Fila + nIteracion + 3, 2).Value & " y X3 = " & Vs3 & "."
    End If
End Sub

Sub PrincipalPuntoFijoNL()
    Range("B13:I113").Value = ""
    ParametrosIniciales
    nIteracion = 0
    PuntoFijoNL
End Sub
Sub limpiar_PFNL()
    Range("B11:I78").Clear
End Sub


