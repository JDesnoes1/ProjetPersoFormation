import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./linkPagesFormation.scss";
import { AchatContext } from "../../context/achatContext";

const LinkPagesFormation = (idFormation) => {
  const { hasFormation } = useContext(AchatContext);
  const [formation, setFormation] = useState(null);

  idFormation = parseInt(useLocation().pathname.split("/")[2]);

  useEffect(() => {
    const getFormation = async () => {
      const response = await makeRequest.get(`formation/find/${idFormation}`);
      if (response && response.data) {
        setFormation(response.data);
      }
    };
    getFormation();
  }, [idFormation]);

  if (!formation) {
    return <div>Loading...</div>;
  }

  let modules;

  if (formation.id === 3) {
    modules = (
      <div className="leftbar">
        <div className="titre">
          <h2>Formation {formation.nom}</h2>
        </div>
        <div className="liens">
          <a href="">Module 1</a>
          <a href="">Module 2</a>
          <a href="">Module 3</a>
          <a href="">Module 4</a>
          <a href="">Module 5</a>
          <a href="">Module 6</a>
          <a href="">Module 7</a>
          <a href="">Module 8</a>
          <a href="">Module 9</a>
          <a href="">Module 10</a>
          <a href="">Module 11</a>
          <a href="">Module 12</a>
          <a href="">Module 13</a>
          <a href="">Module 15</a>
          <a href="">Module 16</a>
          <a href="">Module 17</a>
          <a href="">Module 18</a>
          <a href="">Module 19</a>
          <a href="">Module 20</a>
          <a href="">Module 21</a>
          <a href="">Module 22</a>
          <a href="">Module 23</a>
        </div>
      </div>
    );
  }
  if (formation.id === 1) {
    modules = (
      <div className="leftbar">
        <div className="titre">
          <h2>Formation {formation.nom}</h2>
        </div>
        <div className="liens">
          <a href="">Module 1</a>
          <a href="">Module 2</a>
          <a href="">Module 3</a>
          <a href="">Module 4</a>
          <a href="">Module 5</a>
          <a href="">Module 6</a>
          <a href="">Module 7</a>
          <a href="">Module 8</a>
          <a href="">Module 9</a>
          <a href="">Module 10</a>
          <a href="">Module 11</a>
          <a href="">Module 12</a>
          <a href="">Module 13</a>
        </div>
      </div>
    );
  }

  if (formation.id === 2) {
    modules = (
      <div className="leftbar">
        <div className="titre">
          <h2>Formation {formation.nom}</h2>
        </div>
        <div className="liens">
          <a href="">Module 1</a>
          <a href="">Module 2</a>
          <a href="">Module 3</a>
          <a href="">Module 4</a>
          <a href="">Module 5</a>
          <a href="">Module 6</a>
          <a href="">Module 7</a>
          <a href="">Module 8</a>
          <a href="">Module 9</a>
          <a href="">Module 10</a>
          <a href="">Module 11</a>
          <a href="">Module 12</a>
          <a href="">Module 13</a>
          <a href="">Module 14</a>
        </div>
      </div>
    );
  }

  return modules;
};

export default LinkPagesFormation;
