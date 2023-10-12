import { config } from "../../utils/config";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CasinoList from "../CasinoList/CasinoList";
import UseState from "../../hooks/UseState";
import TabPanel from "./TabPanel";
import { tabPanel } from "../../static/tabs/tabs";
import BetTable from "../../components/BetTable/BetTable";
const HomePage = () => {
  const isCasino = config?.result?.settings.casino;
  const auraCasinoApi = config?.result?.endpoint?.auraCasino;
  const token = localStorage.getItem("token");
  const [casino_list, setCasino_list] = useState([]);
  const { sports } = UseState();
  const [data, setData] = useState([]);
  const cricketApi = config?.result?.endpoint?.group;

  useEffect(() => {
    const getAuraCasino = async () => {
      const res = await axios.get(auraCasinoApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      setCasino_list(data);
    };
    getAuraCasino();
  }, [auraCasinoApi, token]);

  useEffect(() => {
    const cricketData = async () => {
      if (sports !== null) {
        const apiUrl = `${cricketApi}/${sports}`;
        const res = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setData(data);
      }
    };
    cricketData();
    if (sports === 4 || sports === 1) {
      const intervalId = setInterval(cricketData, 1000);
      return () => clearInterval(intervalId);
    }
  }, [sports, cricketApi, token]);

  return (
    <div className="center-container">
      <ul className="nav nav-pills sports-tab">
        {tabPanel.map((tab) => (
          <TabPanel
            label={tab.label}
            icon={tab.icon}
            to={tab.to}
            key={tab.label}
            id={tab.id}
          />
        ))}
      </ul>

      <div className="tab-content mt-1">
        <div className="tab-pane active">
          <div className="bet-table">
            <div className="bet-table-header">
              <div className="bet-nation-name">
                <b>Game</b>
              </div>
              <div className="bet-nation-odd">
                <b>1</b>
              </div>
              <div className="bet-nation-odd">
                <b>X</b>
              </div>
              <div className="bet-nation-odd">
                <b>2</b>
              </div>
            </div>
            <div className="bet-table-body">
              {sports === 4 &&
                Object.values(data).map((d, i) => (
                  <BetTable key={i} data={d} />
                ))}
              {sports === 1 &&
                Object.values(data).map((d, i) => (
                  <BetTable key={i} data={d} />
                ))}

              {sports === 2 &&
                Object.values(data).map((d, i) => (
                  <BetTable key={i} data={d} />
                ))}
            </div>
          </div>
        </div>
      </div>

      {isCasino === "aura" && (
        <div className="casino-list mt-2">
          {casino_list.map((casino, i) => (
            <CasinoList key={i} casino={casino} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
