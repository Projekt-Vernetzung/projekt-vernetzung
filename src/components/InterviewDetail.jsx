import React, { useState, useRef, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";
import { useGlobalState } from "../data/GlobalState";
import yaml from "js-yaml";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import ButtonBigRounded from "./elements/ButtonBigRounded";

function InterviewDetail() {
  const { state, dispatch } = useGlobalState();
  const { organizationName } = useParams();

  const fetchAndParseYamlData = (url, dispatch, actionType, dataKey) => {
    fetch(url)
      .then((response) => response.text())
      .then((yamlText) => {
        const parsedData = yaml.load(yamlText);
        // console.log(parsedData);
        // console.log(dataKey);
        // console.log(parsedData[dataKey]);
        dispatch({
          type: actionType,
          payload: parsedData[dataKey], // Verwenden Sie den übergebenen dataKey als Schlüssel
        });
      });
  };

  useEffect(() => {
    fetchAndParseYamlData(
      "https://raw.githubusercontent.com/frievoe97/projekt-vernetzung/main/src/data/anlaufstellenData.yaml",
      dispatch,
      "SET_ANLAUFSTELLEN_DATA",
      "anlaufstellenData" // Übergeben Sie den Namen des Schlüssels
    );
  }, [dispatch]);

  const interview = state.anlaufstellenData.find(
    (interview) =>
      convertToSlug(interview.name) + "-" + interview.id === organizationName
  );

  if (!interview) {
    // Hier kannst du eine Meldung anzeigen, wenn das Interview nicht gefunden wurde.
    return <p>Interview nicht gefunden.</p>;
  }

  // Ersetze Leerzeichen durch Bindestriche und konvertiere zu Kleinbuchstaben
  function convertToSlug(inputString) {
    return inputString.replace(/\s+/g, "-").toLowerCase();
  }

  //   console.log(state.interviewExample);

  if (!state.interviewExample) {
    // Hier kannst du eine Meldung anzeigen, wenn das Interview nicht gefunden wurde.
    return <p>Interview nicht gefunden.</p>;
  }

  //   const firstInterview = state.interviewExample[0]["FragenUndAntworten"];

  return (
    <div className="relative overflow-hidden mx-auto">
      <div className="w-full max-h-64 overflow-hidden relative">
        <img
          src={interview.image}
          alt={interview.name}
          className="w-full h-full object-cover object-center contrast-50 min-h-[200px]"
        />
        {/* <div className="absolute left-0  bottom-0 flex items-center justify-center text-black w-fit h-fit bg-white rounded  ">
          <h1 className="text-2xl font-bold p-4">{interview.name}</h1>
        </div> */}
      </div>
      <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl my-16">
        <div className="px-4 md:border-2 md:border-black md:rounded-xl md:shadow-xl md:py-8 md:mx-8">
          <button className="text-black overflow-hidden transition-border-color hover:border-transparent bg-transparent">
            <Link className="text-black hover:text-black" to={`/interviews`}>
              <FontAwesomeIcon icon={faAngleLeft} className="mr-4" />
              Zurück
            </Link>
          </button>
          <div className="bg-transparent  rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-2">{interview.name}</h2>
            <p className="text-gray-500 text mb-2">Datum: {interview.date}</p>
            <div className="space-y-8 text-lg">
              {interview["interview"].map((item) => (
                <div>
                  <div key={item} className="font-bold">
                    {item.Frage}
                  </div>
                  <div className="text-justify">{item.Antwort}</div>
                </div>
              ))}
            </div>
          </div>
          <ButtonBigRounded
            buttonText="Zurück zu allen Interviews"
            link="/interviews"
          />
        </div>
      </div>
    </div>
  );
}

export default InterviewDetail;
