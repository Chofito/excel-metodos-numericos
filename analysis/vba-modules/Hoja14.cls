Attribute VB_Name = "Hoja14"
Attribute VB_Base = "0{00020820-0000-0000-C000-000000000046}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True
Attribute VB_TemplateDerived = False
Attribute VB_Customizable = True
Public V1, V2, V3, V4, V5, V6, Vs1, Vs2, Vs3, Vs4, Vs5, Vs6, Vy6, Error As Double
Public Tolerancia, E1, E2, E3, E4, E5, E6 As Double
Public maxIteracion, nIteracion, Fila As Integer
Public Formula As String

Private Sub ParametrosIniciales()
        
    Tolerancia = Cells(12, 8).Value
    maxIteracion = Cells(10, 8).Value
    
    V1 = Cells(10, 3).Value
    V2 = Cells(11, 3).Value
    V3 = Cells(12, 3).Value
    
    Fila = 14
End Sub


Sub jacobi_AR()
    nIteracion = nIteracion + 1
    
    Vs1 = ((Cells(6, 6).Value - Cells(6, 4).Value * V2 - Cells(6, 5).Value * V3) / (Cells(6, 3).Value))
    Vs2 = ((Cells(7, 6).Value - Cells(7, 3).Value * V1 - Cells(7, 5).Value * V3) / (Cells(7, 4).Value))
    Vs3 = ((Cells(8, 6).Value - Cells(8, 3).Value * V1 - Cells(8, 4).Value * V2) / (Cells(8, 5).Value))
    
    E1 = Abs(Vs1 - V1)
    E2 = Abs(Vs2 - V2)
    E3 = Abs(Vs3 - V3)
      
   If E1 >= E2 And E1 >= E3 Then
      Error = E1
   End If
   
         If E2 >= E1 And E2 >= E3 Then
            Error = E2
         End If
    
               If E3 >= E1 And E3 >= E2 Then
                   Error = E3
               End If

    
    
    
    Cells(Fila + nIteracion, 1).Value = nIteracion
    Cells(Fila + nIteracion, 2).Value = Vs1
    Cells(Fila + nIteracion, 3).Value = Vs2
    Cells(Fila + nIteracion, 4).Value = Vs3
    Cells(Fila + nIteracion, 5).Value = E1
    Cells(Fila + nIteracion, 6).Value = E2
    Cells(Fila + nIteracion, 7).Value = E3
    Cells(Fila + nIteracion, 8).Value = Error
    
    If Error > Tolerancia Then
        If nIteracion < maxIteracion Then
            V1 = Vs1
            V2 = Vs2
            V3 = Vs3
            jacobi_AR
        Else
            Cells(Fila + nIteracion + 2, 1).Value = "El sistema no converge en las iteraciones solicitadas (" & maxIteracion & ")"
        End If
    Else
        Cells(Fila + nIteracion + 2, 1).Value = "La solucion se encontro en la " & nIteracion & " iteracion, con un valor de: X1 = " & Vs1 & ", X2 = " & Vs2 & " y X3 = " & Vs3 & "."
    End If
End Sub

Sub PrincipalJacobi()
    Range("A15:I119").Value = ""
    ParametrosIniciales
    nIteracion = 0
    jacobi_AR
End Sub
Sub limpiar()
    Range("A15:I119").Clear
End Sub

Private Sub ParametrosIniciales_4()
        
    Tolerancia = Cells(11, 15).Value
    maxIteracion = Cells(9, 15).Value
    
    V1 = Cells(9, 18).Value
    V2 = Cells(10, 18).Value
    V3 = Cells(11, 18).Value
    V4 = Cells(12, 18).Value
    
    Fila = 14
    
End Sub

Sub jacobi_AR_4()
    nIteracion = nIteracion + 1
    
    Vs1 = ((Cells(4, 17).Value - Cells(4, 14).Value * V2 - Cells(4, 15).Value * V3 - Cells(4, 16).Value * V4) / (Cells(4, 13).Value))
    Vs2 = ((Cells(5, 17).Value - Cells(5, 13).Value * V1 - Cells(5, 15).Value * V3 - Cells(5, 16).Value * V4) / (Cells(5, 14).Value))
    Vs3 = ((Cells(6, 17).Value - Cells(6, 13).Value * V1 - Cells(6, 14).Value * V2 - Cells(6, 16).Value * V4) / (Cells(6, 15).Value))
    Vs4 = ((Cells(7, 17).Value - Cells(7, 13).Value * V1 - Cells(7, 14).Value * V2 - Cells(7, 15).Value * V3) / (Cells(7, 16).Value))
    E1 = Abs(Vs1 - V1)
    E2 = Abs(Vs2 - V2)
    E3 = Abs(Vs3 - V3)
    E4 = Abs(Vs4 - V4)
      
    If E1 >= E2 And E1 >= E3 And E1 >= E4 Then
                   Error = E1
    End If
            If E2 >= E1 And E2 >= E3 And E2 >= E4 Then
                Error = E2
            End If
                   If E3 >= E1 And E3 >= E2 And E3 >= E4 Then
                      Error = E3
                   End If
    
                          If E4 >= E1 And E4 >= E2 And E4 >= E3 Then
                              Error = E4
                          End If
    
        
    Cells(Fila + nIteracion, 11).Value = nIteracion
    Cells(Fila + nIteracion, 12).Value = Vs1
    Cells(Fila + nIteracion, 13).Value = Vs2
    Cells(Fila + nIteracion, 14).Value = Vs3
    Cells(Fila + nIteracion, 15).Value = Vs4
    Cells(Fila + nIteracion, 16).Value = E1
    Cells(Fila + nIteracion, 17).Value = E2
    Cells(Fila + nIteracion, 18).Value = E3
    Cells(Fila + nIteracion, 19).Value = E4
    Cells(Fila + nIteracion, 20).Value = Error
    
    If Error > Tolerancia Then
        If nIteracion < maxIteracion Then
            V1 = Vs1
            V2 = Vs2
            V3 = Vs3
            V4 = Vs4
            jacobi_AR_4
        Else
            Cells(Fila + nIteracion + 2, 11).Value = "El sistema no converge en las iteraciones solicitadas (" & maxIteracion & ")"
        End If
    Else
        Cells(Fila + nIteracion + 2, 11).Value = "La solucion se encontro en la " & nIteracion & " iteracion, con un valor de: X1 = " & Vs1 & ", X2 = " & Vs2 & " y X3 = " & Vs3 & ","
        Cells(Fila + nIteracion + 3, 16).Value = " X4 = " & Vs4 & " ."
    End If
End Sub
Sub PrincipalJacobi_4()
    Range("k15:U119").Value = ""
    ParametrosIniciales_4
    nIteracion = 0
    jacobi_AR_4
End Sub
Sub limpiar_4()
    Range("k15:U119").Clear
End Sub

Private Sub ParametrosIniciales_5()
        
    Tolerancia = Cells(11, 28).Value
    maxIteracion = Cells(9, 28).Value
          
    V1 = Cells(9, 31).Value
    V2 = Cells(10, 31).Value
    V3 = Cells(11, 31).Value
    V4 = Cells(12, 31).Value
    V5 = Cells(13, 31).Value
    Fila = 15

End Sub
Sub jacobi_AR_5()
    nIteracion = nIteracion + 1
    
    Vs1 = ((Cells(3, 30).Value - Cells(3, 26).Value * V2 - Cells(3, 27).Value * V3 - Cells(3, 28).Value * V4 - Cells(3, 29).Value * V5) / (Cells(3, 25).Value))
    Vs2 = ((Cells(4, 30).Value - Cells(4, 25).Value * V1 - Cells(4, 27).Value * V3 - Cells(4, 28).Value * V4 - Cells(4, 29).Value * V5) / (Cells(4, 26).Value))
    Vs3 = ((Cells(5, 30).Value - Cells(5, 25).Value * V1 - Cells(5, 26).Value * V2 - Cells(5, 28).Value * V4 - Cells(5, 29).Value * V5) / (Cells(5, 27).Value))
    Vs4 = ((Cells(6, 30).Value - Cells(6, 25).Value * V1 - Cells(6, 26).Value * V2 - Cells(6, 27).Value * V3 - Cells(6, 29).Value * V5) / (Cells(6, 28).Value))
    Vs5 = ((Cells(7, 30).Value - Cells(7, 25).Value * V1 - Cells(7, 26).Value * V2 - Cells(7, 27).Value * V3 - Cells(7, 28).Value * V4) / (Cells(7, 29).Value))
        
    E1 = Abs(Vs1 - V1)
    E2 = Abs(Vs2 - V2)
    E3 = Abs(Vs3 - V3)
    E4 = Abs(Vs4 - V4)
    E5 = Abs(Vs5 - V5)
      
    If E1 >= E2 And E1 >= E3 And E1 >= E4 And E1 >= E5 Then
                   Error = E1
    End If
            If E2 >= E1 And E2 >= E3 And E2 >= E4 And E2 >= E5 Then
                Error = E2
            End If
                   If E3 >= E1 And E3 >= E2 And E3 >= E4 And E3 >= E5 Then
                      Error = E3
                   End If
                          If E4 >= E1 And E4 >= E2 And E4 >= E3 And E4 >= E5 Then
                              Error = E4
                          End If
                                If E5 >= E1 And E5 >= E2 And E5 >= E3 And E5 >= E4 Then
                                    Error = E5
                                End If
        
    Cells(Fila + nIteracion, 23).Value = nIteracion
    Cells(Fila + nIteracion, 24).Value = Vs1
    Cells(Fila + nIteracion, 25).Value = Vs2
    Cells(Fila + nIteracion, 26).Value = Vs3
    Cells(Fila + nIteracion, 27).Value = Vs4
    Cells(Fila + nIteracion, 28).Value = Vs5
    Cells(Fila + nIteracion, 29).Value = E1
    Cells(Fila + nIteracion, 30).Value = E2
    Cells(Fila + nIteracion, 31).Value = E3
    Cells(Fila + nIteracion, 32).Value = E4
    Cells(Fila + nIteracion, 33).Value = E5
    Cells(Fila + nIteracion, 34).Value = Error
    
    If Error > Tolerancia Then
        If nIteracion < maxIteracion Then
            V1 = Vs1
            V2 = Vs2
            V3 = Vs3
            V4 = Vs4
            V5 = Vs5
            jacobi_AR_5
        Else
            Cells(Fila + nIteracion + 2, 23).Value = "El sistema no converge en las iteraciones solicitadas (" & maxIteracion & ")"
        End If
    Else
        Cells(Fila + nIteracion + 2, 23).Value = "La solucion se encontro en la " & nIteracion & " iteracion, con un valor de: X1 = " & Vs1 & ", X2 = " & Vs2 & " y X3 = " & Vs3 & ","
        Cells(Fila + nIteracion + 3, 28).Value = " X4 = " & Vs4 & " y X5 = " & Vs5 & "."
    End If
End Sub
Sub PrincipalJacobi_5()
    Range("W16:AH119").Value = ""
    ParametrosIniciales_5
    nIteracion = 0
    jacobi_AR_5
End Sub
Sub limpiar_5()
    Range("W16:AH119").Clear
End Sub

Private Sub ParametrosIniciales_6()
        
    Tolerancia = Cells(14, 45).Value
    maxIteracion = Cells(11, 45).Value
          
    V1 = Cells(11, 40).Value
    V2 = Cells(12, 40).Value
    V3 = Cells(13, 40).Value
    V4 = Cells(14, 40).Value
    V5 = Cells(15, 40).Value
    V6 = Cells(16, 40).Value
    Fila = 18

End Sub
Sub jacobi_AR_6()
    nIteracion = nIteracion + 1
    
    Vs1 = (Cells(4, 45).Value - Cells(4, 40).Value * V2 - Cells(4, 41).Value * V3 - Cells(4, 42).Value * V4 - Cells(4, 43).Value * V5 - Cells(4, 45).Value * V6) / Cells(4, 39).Value
    Vs2 = (Cells(5, 45).Value - Cells(5, 39).Value * V1 - Cells(5, 41).Value * V3 - Cells(5, 42).Value * V4 - Cells(5, 43).Value * V5 - Cells(5, 44).Value * V6) / Cells(5, 40).Value
    Vs3 = (Cells(6, 45).Value - Cells(6, 39).Value * V1 - Cells(6, 40).Value * V2 - Cells(6, 42).Value * V4 - Cells(6, 43).Value * V5 - Cells(6, 44).Value * V6) / Cells(6, 41).Value
    Vs4 = (Cells(7, 45).Value - Cells(7, 39).Value * V1 - Cells(7, 40).Value * V2 - Cells(7, 41).Value * V3 - Cells(7, 43).Value * V5 - Cells(7, 44).Value * V6) / Cells(7, 42).Value
    Vs5 = (Cells(8, 45).Value - Cells(8, 39).Value * V1 - Cells(8, 40).Value * V2 - Cells(8, 41).Value * V3 - Cells(8, 42).Value * V4 - Cells(8, 44).Value * V6) / Cells(8, 43).Value
    Vs6 = (Cells(9, 45).Value - Cells(9, 39).Value * V1 - Cells(9, 40).Value * V2 - Cells(9, 41).Value * V3 - Cells(9, 42).Value * V4 - Cells(9, 43).Value * V5) / Cells(9, 44).Value
    
    E1 = Abs(Vs1 - V1)
    E2 = Abs(Vs2 - V2)
    E3 = Abs(Vs3 - V3)
    E4 = Abs(Vs4 - V4)
    E5 = Abs(Vs5 - V5)
    E6 = Abs(Vs6 - V6)
      
    If E1 >= E2 And E1 >= E3 And E1 >= E4 And E1 >= E5 And E1 >= E6 Then
                   Error = E1
    End If
            If E2 >= E1 And E2 >= E3 And E2 >= E4 And E2 >= E5 And E2 >= E6 Then
                Error = E2
            End If
                   If E3 >= E1 And E3 >= E2 And E3 >= E4 And E3 >= E5 And E3 >= E6 Then
                      Error = E3
                   End If
                          If E4 >= E1 And E4 >= E2 And E4 >= E3 And E4 >= E5 And E4 >= E6 Then
                              Error = E4
                          End If
                                If E5 >= E1 And E5 >= E2 And E5 >= E3 And E5 >= E4 And E5 >= E6 Then
                                    Error = E5
                                End If
                                
                                      If E6 >= E1 And E6 >= E2 And E6 >= E3 And E6 >= E4 And E6 >= E5 Then
                                            Error = E6
                                      End If
        
    Cells(Fila + nIteracion, 36).Value = nIteracion
    Cells(Fila + nIteracion, 37).Value = Vs1
    Cells(Fila + nIteracion, 38).Value = Vs2
    Cells(Fila + nIteracion, 39).Value = Vs3
    Cells(Fila + nIteracion, 40).Value = Vs4
    Cells(Fila + nIteracion, 41).Value = Vs5
    Cells(Fila + nIteracion, 42).Value = Vs6
    Cells(Fila + nIteracion, 43).Value = E1
    Cells(Fila + nIteracion, 44).Value = E2
    Cells(Fila + nIteracion, 45).Value = E3
    Cells(Fila + nIteracion, 46).Value = E4
    Cells(Fila + nIteracion, 47).Value = E5
    Cells(Fila + nIteracion, 48).Value = E6
    Cells(Fila + nIteracion, 49).Value = Error
    
    If Error > Tolerancia Then
        If nIteracion < maxIteracion Then
            V1 = Vs1
            V2 = Vs2
            V3 = Vs3
            V4 = Vs4
            V5 = Vs5
            V6 = Vs6
            jacobi_AR_6
        Else
            Cells(Fila + nIteracion + 2, 37).Value = "El sistema no converge en las iteraciones solicitadas (" & maxIteracion & ")"
        End If
    Else
        Cells(Fila + nIteracion + 3, 37).Value = "La solucion se encontro en la " & nIteracion & " iteracion, con un valor de: X1 = " & Vs1 & ", X2 = " & Vs2 & " y X3 = " & Vs3 & ","
        Cells(Fila + nIteracion + 4, 40).Value = " X4 = " & Vs4 & ", X5 = " & Vs5 & "y X6=" & Vs6 & "."
        
    End If
End Sub
Sub PrincipalJacobi_6()
    Range("AJ19:AW119").Value = ""
    ParametrosIniciales_6
    nIteracion = 0
    jacobi_AR_6
End Sub
Sub limpiar_6()
    Range("AJ19:AW119").Clear
End Sub

