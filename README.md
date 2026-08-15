# Shaker Design Vault – GitHub Pages

Diese Version funktioniert direkt mit GitHub Pages – ohne Node.js-Server.

## Einmalig veröffentlichen

1. Den gesamten Inhalt dieses Ordners in ein neues GitHub-Repository hochladen.
2. Im Repository `Settings` → `Pages` öffnen und bei **Build and deployment** die Quelle **GitHub Actions** auswählen.
3. Den Reiter `Actions` öffnen und warten, bis **Deploy Shaker Design Vault** erfolgreich durchgelaufen ist.
4. Den angezeigten Pages-Link öffnen.

## Dateien und Vorschaubilder hinzufügen

Lege herunterladbare Dateien im Ordner `uploads` ab und pushe sie zu GitHub. Der GitHub-Workflow erstellt die Dateiliste automatisch.

Für eine eigene Vorschau legst du im Ordner `previews` ein Bild mit demselben Namen ohne Dateiendung ab. Beispiel: `uploads/shaker-pink.pdf` bekommt die Vorschau `previews/shaker-pink.jpg`. Bilddateien in `uploads` verwenden sich selbst automatisch als Vorschau.

Unterstützte Vorschaubilder: `.jpg`, `.jpeg`, `.png`, `.webp`.

## Hinweis zum Passwort

GitHub Pages kann keinen serverseitigen Passwortschutz ausführen. Die Passwortabfrage ist deshalb nur eine Zugangssperre in der Oberfläche; technisch versierte Personen könnten die Dateien über ihre direkten URLs aufrufen. Für vertrauliche Dateien ist ein Node.js-Host mit echtem Login erforderlich.
