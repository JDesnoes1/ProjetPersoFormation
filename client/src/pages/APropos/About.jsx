import "./about.scss";

const About = () => {
  return (
    <div className="apropos">
      <div className="cards">
        <div className="left">
          <h1>Qui sommes nous ?</h1>
          <p>
            Nous sommes deux amis originaires de Rennes, nous avons découvert la
            programmation début 2023.
          </p>
          <p>
            Ayant tous les deux la même passion pour la programmation et le
            partage de connaissances, nous avons décidé de lancer Formations
            Dev.
          </p>
          <p>
            Notre objectif est de permettre à n'importe qui de se reconvertir
            dans le développement web sans payer des sommes astronomiques ou
            suivre des cours en bootcamp. De plus, nous voulions vous permettre
            d'avoir à disposition des formations complètes qui sont travaillées
            et mis à jour régulièrement, sans contraintes, vous pouvez
            travailler à votre rythme.
          </p>
          <p>
            Vous permettre d'acquérir les conaissances nécessaires pour vous
            amuser à créer des sites ou même trouver un travail par la suite est
            pour nous primordial, nos formations sont complètes.
          </p>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default About;
