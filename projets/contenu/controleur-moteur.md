## Présentation du projet

Ce contrôleur pilote des **moteurs pas-à-pas** avec une grande précision, tout en offrant
une interface utilisateur simple et une commande à distance par **Bluetooth**.

Il a été pensé pour des applications de positionnement fin, comme une petite machine
CNC ou un banc de test motorisé.

## Fonctionnalités principales

- Contrôle précis de la vitesse et de la position
- Interface de commande par Bluetooth (smartphone)
- Accélération et décélération progressives (rampes)
- Protection contre la surchauffe du driver

## Matériel utilisé

- Microcontrôleur **STM32**
- Driver de moteur **A4988 / DRV8825**
- Module **Bluetooth HC-05**
- Moteur pas-à-pas NEMA 17

## Comment ça marche ?

Le microcontrôleur génère des impulsions dont la fréquence détermine la vitesse de
rotation du moteur. Une rampe d'accélération évite les à-coups au démarrage.

1. L'utilisateur envoie une commande depuis son téléphone
2. Le STM32 calcule la trajectoire (rampe)
3. Le driver alimente les bobines du moteur

## Résultat

Le contrôleur atteint une résolution de positionnement très fine et fonctionne
silencieusement grâce au micro-pas. Le pilotage Bluetooth rend son usage très pratique.
