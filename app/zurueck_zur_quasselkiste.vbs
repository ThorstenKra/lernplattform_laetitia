' zurueck_zur_quasselkiste.vbs
' Führt die BAT-Datei unsichtbar aus (kein schwarzes Fenster)
' Wird von index.html aufgerufen wenn Laetitia zur Quasselkiste zurück will
'
' ABLAGEORT: app/ (gleicher Ordner wie index.html)

Dim objShell
Set objShell = CreateObject("WScript.Shell")

' Pfad zur BAT-Datei (liegt im gleichen Ordner)
Dim batPfad
batPfad = Replace(WScript.ScriptFullName, "zurueck_zur_quasselkiste.vbs", "quasselkiste_starten.bat")

' 0 = unsichtbar ausführen (kein schwarzes CMD-Fenster)
objShell.Run """" & batPfad & """", 0, False

Set objShell = Nothing
