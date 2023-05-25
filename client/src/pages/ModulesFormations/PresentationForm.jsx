import "./presentationForm.scss";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import LinkPagesFormation from "../../composants/LinkPagesFormation/LinkPagesFormation";

const PresentationForm = () => {
  const [formation, setFormation] = useState(null);

  const idFormation = parseInt(useLocation().pathname.split("/")[2]);

  useEffect(() => {
    const getFormation = async () => {
      const response = await makeRequest.get(`formation/find/${idFormation}`);
      if (response && response.data) {
        setFormation(response.data);
      }
    };
    getFormation();
  }, [idFormation]);

  let formationContent;

  if (formation && formation.id === 1) {
    formationContent = (
      <div className="content">
        <h1>Bienvenu sur notre formation {formation.nom}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error libero
          saepe, exercitationem voluptatem architecto delectus culpa possimus
          reiciendis harum iure temporibus suscipit provident voluptatibus
          itaque voluptas. Nobis dignissimos provident doloribus modi adipisci
          veritatis maxime in odio ratione quis asperiores iusto illo est
          cupiditate nesciunt ullam laboriosam dolore, vel voluptatibus. Dolore
          cum provident accusantium? Cum iusto aliquam voluptates officiis eum,
          quasi, recusandae cupiditate veniam saepe natus vitae quam quidem quas
          repellendus ex assumenda modi asperiores optio minus animi quia nihil
          nam. Vel quam quo tempora. In suscipit ratione alias? Accusamus
          obcaecati reprehenderit beatae numquam quidem repellat nostrum,
          voluptate veniam fugiat, molestias quisquam sequi iusto itaque ex
          quasi pariatur dolor quod officiis, magni officia! Laudantium aliquam
          beatae, quibusdam debitis, adipisci officia animi veniam voluptatum
          laborum ea autem id obcaecati, perspiciatis ex quae et. Explicabo
          consectetur inventore fuga modi, dolorem eum et sapiente doloribus
          aliquam accusamus eligendi in quos distinctio provident nulla
          consequuntur nostrum amet eius omnis quod consequatur!
        </p>
        <button>Accès module 1</button>
      </div>
    );
  }
  if (formation && formation.id === 2) {
    formationContent = (
      <div className="content">
        <h1>Bienvenu sur notre formation {formation.nom}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea unde
          accusamus dignissimos nulla deserunt blanditiis, ipsum et atque dicta
          voluptatibus. Fugiat nisi quae sunt quidem minus modi vero provident
          quo nesciunt velit consequuntur laboriosam, vitae numquam illo dolorum
          ea quas fuga, ipsum distinctio error, nostrum expedita optio nulla
          aperiam. Sint eius corrupti dolorem animi consequatur excepturi eaque?
          Commodi sint corrupti recusandae praesentium officia necessitatibus
          iusto quod, quam dolor. Voluptatem reprehenderit vero veniam sapiente
          ullam voluptas alias, vitae nemo illo commodi sint, impedit nesciunt
          consequatur culpa, hic explicabo voluptates sunt itaque reiciendis
          blanditiis optio tenetur! Tempore nulla esse at porro placeat
          perspiciatis temporibus sunt dicta aut. Perspiciatis impedit animi
          consequatur nemo facilis nobis atque ducimus eius, temporibus qui sint
          consequuntur eveniet quis quaerat dolorem dignissimos sunt mollitia,
          hic architecto! Possimus perferendis magni reiciendis, dolores
          accusamus asperiores quaerat itaque praesentium qui nobis? Dolor
          architecto facere suscipit repudiandae ratione odit neque eaque
          praesentium magni velit, debitis veniam odio consectetur obcaecati
          reprehenderit beatae rerum voluptatem dolores enim error aperiam.
        </p>
        <button>Accès module 1</button>
      </div>
    );
  }
  if (formation && formation.id === 3) {
    formationContent = (
      <div className="content">
        <h1>Bienvenu sur notre formation {formation.nom}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          minus modi soluta reiciendis, repellat minima iure, nulla itaque
          aspernatur eum sequi! Sapiente provident perferendis nisi, aspernatur
          perspiciatis commodi ipsam a blanditiis id tempore ab deserunt
          dolores, cum eum! Exercitationem blanditiis accusamus doloribus
          eligendi impedit placeat delectus, laudantium cupiditate accusantium
          quisquam atque reprehenderit nesciunt. Aliquid quibusdam,
          perspiciatis, saepe pariatur corporis quisquam delectus eveniet
          similique expedita amet qui, aliquam eum laudantium! Sed, ex atque,
          necessitatibus natus, obcaecati nisi minus nulla eveniet animi totam
          repellat voluptas. Obcaecati asperiores libero, sapiente ex est facere
          iusto accusamus ipsa quidem illum voluptates reiciendis porro. Sit
          aliquam reiciendis voluptate, earum aspernatur recusandae, totam omnis
          asperiores magnam fuga nulla praesentium possimus a quo eos
          perspiciatis provident quam amet optio odio. Laudantium, saepe
          similique. Debitis eius natus qui ducimus voluptatem temporibus
          repudiandae doloremque ratione? Quae, totam fugiat. Perferendis odit
          distinctio quisquam quas soluta, neque libero non, recusandae
          praesentium aliquam consequatur, sint doloremque in eos possimus
          minus? Tempore magnam facilis sunt ea itaque molestias ut, accusamus
          consequatur? Accusamus esse recusandae consequatur qui exercitationem.
          Veritatis at unde, deleniti minima aut velit deserunt tempora alias
          vero, dolores veniam explicabo quidem porro quae. Et, repellendus
          inventore id voluptate accusantium, enim veniam quis ratione facere
          sunt officiis similique sapiente quisquam. Voluptate dolorem hic error
          laborum blanditiis libero adipisci rerum, ratione consequuntur id iure
          quo iste unde veniam quisquam dicta, dolorum repellat, ullam earum
          quasi incidunt? Labore molestiae sequi nobis qui id architecto.
          Tempore tenetur in necessitatibus sint eos, dignissimos vitae
          molestiae, error doloribus, aliquid similique atque alias obcaecati
          culpa expedita provident consequuntur ducimus. Perspiciatis, iusto
          est! Est quae blanditiis aut non voluptatibus repellat ducimus atque
          voluptate, totam, iure accusamus dignissimos possimus beatae sint
          tenetur, a culpa tempore. Unde ad saepe ipsa, officia quod deserunt
          esse quibusdam iusto voluptatum. Recusandae explicabo, illum quaerat
          inventore officia cupiditate minus doloremque a corporis iure quisquam
          ipsa repellat dolor laudantium exercitationem quas unde illo.
        </p>
        <button>Accès module 1</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <LinkPagesFormation />
        </div>
        <div className="container">{formationContent}</div>
      </div>
    </div>
  );
};

export default PresentationForm;
