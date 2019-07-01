# Projet Offline

Pour l'exemple, j'ai choisi de créer une nouvelle vue et ne pas réutiliser votre
systéme de listes, qui aurait été trop compliqué a adapté.

Il y a une liste dans pages/admin/index et 4 popups pour les 4 actions du CRUD.
Le but étant de faire le plus simple possible.

J'utilise le store pour centraliser la gestion des chantiers, ce qui est important
pour le offline. C'est également dans le store que j'ai mis toutes les fonctions qui touchent à IndexedDb.

L'ensemble du systéme repose sur IndexedDb. Le Service Worker permet de mettre en cache des requetes mais
il ne permet pas de conserver un "state" local. Ce qu'on est obligé de faire si on souhaite éditer/créer offline.

Quand je crée un Chantier par exemple, je le stocke dans ma base de donnée locale, elle sera synchronisée par la suite
dans le backend. On ne peux pas simplement mettre les requetes en cache et faire une file d'attente, puisqu'on a besoin
d'afficher la liste dans notre vue.

Le probléme c'est que cela nous oblige à raisonner Offline first et globalement l'ensemble du state est stocké en local.
Quand je fais une action d'édition, de création, etc ... on le fait dans la base de donnée locale.

On peut par la suite synchroniser les modifications (quand on est en ligne du coup).

Dans le fichier du store on à l'ensemble des methodes pour create, update, delete, etc ... et les méthodes qui 
s'occupent de la syncronisation.

C'est assez complexe et le code pour l'intéraction avec l'IndexedDb est un peu verbeux. 
Je n'ai pas utiliser de librairies mais on aurait pu pour simplifier l'écriture.

J'ai choisi de créer 4 tables dans l'IndexedDb pour suivre l'état de tous les chantiers. 
On aurait sans doute pu simplifier mais cela aurait nécessité des modifications dans le Back.
Notamment au niveau des ID, il serait mieux d'utiliser des UUID et de faire la generation des ID coté front du coup.  

