"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import AlertUi from "@/components/myUi/AlertUi";

function CardUi() {
  // Initialisation des états avec useState
  const [nomsRestants, setNomsRestants] = useState([
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Ethan",
  ]);
  const [nomsTires, setNomsTires] = useState([]);
  const [vide, setVide] = useState(false);
  const [tirageVerrouille, setTirageVerrouille] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Vérification au montage si la clé de tirage existe dans le localStorage
    const tirageEffectue = localStorage.getItem("tirageEffectue");
    if (tirageEffectue) {
      setTirageVerrouille(true);
    }
  }, []);

  // Fonction pour tirer un nom au hasard
  const tirerNom = () => {
    if (nomsRestants.length === 0) {
      setVide(true);
      return;
    }

    // Vérifier si le tirage est verrouillé
    if (tirageVerrouille) {
      return;
    }

    // Index aléatoire et sélection du nom
    const indexAleatoire = Math.floor(Math.random() * nomsRestants.length);
    const nomSelectionne = nomsRestants[indexAleatoire];

    // Mise à jour des états avec une seule fonction de mise à jour pour optimiser
    setNomsTires((prevNomsTires) => [...prevNomsTires, nomSelectionne]);
    setNomsRestants((prevNomsRestants) =>
      prevNomsRestants.filter((_, index) => index !== indexAleatoire)
    );

    // Définir la clé persistante pour verrouiller le tirage
    localStorage.setItem("tirageEffectue", "true");
    setTirageVerrouille(true);
  };

  return (
    <>
      {vide ? <AlertUi message="La table est maintenant complete." /> : null}

      {tirageVerrouille ? (
        <AlertUi message="Le tirage a déjà été effectué, vous ne pouvez plus tirer de nom." />
      ) : null}

      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-bold mb-8">
            Tirage au sort
          </CardTitle>
          <CardDescription>
            Cet espace a été créé pour établir un ordre de passage de manière
            transparente.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="mt-8">
          <p className="opacity-75">
            Bienvenue sur notre plateforme dédiée à la gestion équitable des
            cotisations de groupe ! À chaque clic, un tirage aléatoire détermine
            le prochain participant. La liste des noms tirés est mise à jour
            automatiquement pour garantir une rotation équitable et renforcer la
            confiance au sein du groupe de cotisation.
          </p>

          <div className="mt-16 mb-16">
            <Button
              size="lg"
              variant="outline"
              onClick={tirerNom}
              aria-label="Faire le tirage"
            >
              Faire le tirage !
            </Button>
          </div>

          {/* Tableau des noms tirés et restants */}
          <Table>
            <TableCaption className="text-xl">
              Liste des noms de passage
            </TableCaption>
            {/* <TableHeader>
              <TableRow>
                <TableHead>Passage</TableHead>
                <TableHead>Prénoms tirés</TableHead>
              </TableRow>
            </TableHeader> */}

            <TableBody>
              {nomsTires.length > 0 ? (
                nomsTires.map((nom, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{nom}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="2" className="text-lg text-center">
                    Aucun nom tiré
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        <Separator />
        <CardFooter className="text-center mt-10">
          <p className="opacity-45">StylandDigital 2023/2024</p>
        </CardFooter>
      </Card>
    </>
  );
}

export default CardUi;
