import "./detailsFormation.scss";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";

const DetailsFormations = ({ formationId }) => {
  const [formation, setFormation] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const getFormation = async () => {
      const response = await makeRequest.get(`formation/find/${formationId}`);
      if (response && response.data) {
        setFormation(response.data);
      }
    };
    getFormation();
  }, [formationId]);

  if (!formation) {
    return <div>Loading...</div>;
  }

  const handleAchat = async () => {
    try {
      await makeRequest.post("achat", { formationId: formationId });
    } catch (err) {
      setErr(err.response.data);
    }
  };

  let formationContent;

  if (formation.id === 3) {
    formationContent = (
      <div className="formation">
        <div className="card">
          <h1>Formation FullStack</h1>
          <div className="infos">
            <div className="avantages">
              <h2>Avantages</h2>
              <div className="liste">
                <p>- Tout en une formation !</p>
                <p>- Vous pouvez être totalement débutant</p>
                <p>- Une formation mis à jour régulièrement</p>
                <p>- Des points réguliers sur la sécurité </p>
                <p>- Pas de contraintes de temps</p>
                <p>- Pas de contraintes de déplacement</p>
                <p>- Des exercices à chaques modules</p>
                <p>- Un TP dit "fil rouge" en plus des exercices</p>
                <p>
                  - Notre objectif : Vous donner toutes les clés pour être
                  disponible sur le marché du travail
                </p>
              </div>
            </div>
            <div className="contenu">
              <h2>Contenue de la formation</h2>
              <div className="liste">
                <p>- Module 1 : Mise en place !</p>
                <p>- Module 2 : Les bases de React</p>
                <p>- Module 3 : Les bases de Node Js</p>
                <p>- Module 4 : Base de données MySQL ! </p>
                <p>- Module 5 : Notre première route !</p>
                <p>- Module 6 : Utiliser react avec la route</p>
                <p>- Module 7 : Un formulaire ? </p>
                <p>- Module 8 : La "Double sécurité"</p>
                <p>- Module 9 : Le local Storage</p>
                <p>- Module 10 : Le cookie ? Ca a l'air bon !</p>
                <p>- Module 11 : L'authentification</p>
                <p>- Module 12 : Le contexte</p>
                <p>- Total de 23 modules complets</p>
                <p>- Durée estimée : 400 heures</p>
              </div>
            </div>
          </div>
          <div className="achat">
            <h3>
              Prix : <span>1050€</span> 899.99€
            </h3>
            <button onClick={handleAchat}>ACHETER</button>
          </div>
        </div>
      </div>
    );
  }
  if (formation.id === 2) {
    formationContent = (
      <div className="formation">
        <div className="card">
          <h1>Formation FrontEnd</h1>
          <div className="infos">
            <div className="avantages">
              <h2>Avantages</h2>
              <div className="liste">
                <p>- Formation React complète !</p>
                <p>- Vous pouvez être totalement débutant</p>
                <p>- Une formation mis à jour régulièrement</p>
                <p>- Des points réguliers sur la sécurité </p>
                <p>- Pas de contraintes de temps</p>
                <p>- Pas de contraintes de déplacement</p>
                <p>- Des exercices à chaques modules</p>
                <p>- Un TP dit "fil rouge" en plus des exercices</p>
                <p>
                  - Notre objectif : Vous donner toutes les clés pour être
                  disponible sur le marché du travail
                </p>
              </div>
            </div>
            <div className="contenu">
              <h2>Contenue de la formation</h2>
              <div className="liste">
                <p>- Module 1 : Mise en place !</p>
                <p>- Module 2 : Les bases de React</p>
                <p>- Module 3 : Comment fetch ma data ! </p>
                <p>- Module 6 : Utiliser les Hooks </p>
                <p>- Module 7 : Un formulaire ? </p>
                <p>- Module 9 : Le local Storage</p>
                <p>- Module 10 : Le cookie ? Ca a l'air bon !</p>
                <p>- Module 11 : L'authentification</p>
                <p>- Module 12 : Le contexte</p>
                <p>- Total de 14 modules complets</p>
                <p>- Durée estimée : 250 heures</p>
              </div>
            </div>
          </div>
          <div className="achat">
            <h3>Prix : 475€</h3>
            <button onClick={handleAchat}>ACHETER</button>
          </div>
        </div>
      </div>
    );
  }
  if (formation.id === 1) {
    formationContent = (
      <div className="formation">
        <div className="card">
          <h1>Formation BackEnd</h1>
          <div className="infos">
            <div className="avantages">
              <h2>Avantages</h2>
              <div className="liste">
                <p>- Tout en une formation !</p>
                <p>- Vous pouvez être totalement débutant</p>
                <p>- Une formation mis à jour régulièrement</p>
                <p>- Des points réguliers sur la sécurité </p>
                <p>- Pas de contraintes de temps</p>
                <p>- Pas de contraintes de déplacement</p>
                <p>- Des exercices à chaques modules</p>
                <p>- Un TP dit "fil rouge" en plus des exercices</p>
                <p>
                  - Notre objectif : Vous donner toutes les clés pour être
                  disponible sur le marché du travail
                </p>
              </div>
            </div>
            <div className="contenu">
              <h2>Contenue de la formation</h2>
              <div className="liste">
                <p>- Module 1 : Mise en place !</p>
                <p>- Module 3 : Les bases de Node Js</p>
                <p>- Module 4 : Base de données MySQL ! </p>
                <p>- Module 5 : Notre première route !</p>
                <p>- Module 6 : Il faut qu'on get !</p>
                <p>- Module 7 : Les tests avec insomnia</p>
                <p>- Module 8 : Il faut qu'on post !</p>
                <p>- Total de 13 modules complets</p>
                <p>- Durée estimée : 200 heures</p>
              </div>
            </div>
          </div>
          <div className="achat">
            <h3>Prix : 499.99€</h3>
            <button onClick={handleAchat}>ACHETER</button>
          </div>
        </div>
      </div>
    );
  }

  return formationContent;
};

export default DetailsFormations;
