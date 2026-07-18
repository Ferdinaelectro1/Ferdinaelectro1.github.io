## Présentation du projet

Ce système de surveillance environnementale est un dispositif **IoT autonome**
capable de mesurer en continu la **température**, l'**humidité** et la **qualité de l'air**,
puis d'envoyer ces données en temps réel vers une interface de suivi.

L'objectif était de concevoir un appareil compact, à faible consommation, capable de
fonctionner plusieurs semaines sur batterie.

## Fonctionnalités principales

- Mesure de la température et de l'humidité (capteur DHT22)
- Mesure de la qualité de l'air (capteur MQ-135)
- Transmission des données par Wi-Fi vers un tableau de bord
- Mode veille profonde pour économiser la batterie
- Alerte automatique lorsqu'un seuil est dépassé

## Matériel utilisé

| Composant        | Rôle                                  |
|------------------|---------------------------------------|
| ESP32            | Microcontrôleur + Wi-Fi               |
| DHT22            | Température et humidité               |
| MQ-135           | Qualité de l'air                      |
| Batterie Li-Ion  | Alimentation autonome                 |

## Un extrait du code (ESP32 / C++)

Voici la boucle principale qui lit les capteurs puis envoie les mesures :

```cpp
#include <WiFi.h>
#include <DHT.h>

#define DHTPIN  4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
    Serial.begin(115200);
    dht.begin();
    WiFi.begin("MonReseau", "MotDePasse");
}

void loop() {
    float temperature = dht.readTemperature();
    float humidite    = dht.readHumidity();

    if (isnan(temperature) || isnan(humidite)) {
        Serial.println("Erreur de lecture du capteur !");
        return;
    }

    Serial.printf("Temp: %.1f°C  |  Humidité: %.1f%%\n", temperature, humidite);
    envoyerDonnees(temperature, humidite);

    // Mode veille profonde pendant 5 minutes pour économiser la batterie
    esp_deep_sleep(5 * 60 * 1000000ULL);
}
```

## Résultat

Le dispositif fonctionne de manière fiable et transmet ses mesures toutes les 5 minutes.
L'autonomie mesurée est d'environ **3 semaines** sur une seule charge.

> Prochaine étape : ajouter un panneau solaire pour une autonomie illimitée.
