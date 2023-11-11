import { config } from "../../utils/config";
import { useForm } from "react-hook-form";
import BetTable from "./BetTable";
import { useEffect, useState } from "react";
import Notification from "../../components/Notification/Notification";
const CurrentBet = () => {
  const currentBetsApi = config?.result?.endpoint?.currentBets;
  const { register, handleSubmit } = useForm();
  const token = localStorage.getItem("token");
  const [sports, setSports] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sportsRef, setSportsRef] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = ({ sportsType }) => {
    if (sportsType == "none") {
      setErrorMessage("Select Report Type !");
    }
    if (sportsType) {
      fetch(`${currentBetsApi}/${sportsType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.result) {
            setSports(data.result);
            setFilteredData(data.result);
          }
        });
    }
  };

  /* Filter sports */
  useEffect(() => {
    if (sportsRef !== "all" && sportsRef !== "") {
      const filterLayBack = sports.filter((game) => game.betType === sportsRef);
      setFilteredData(filterLayBack);
    } else if (sportsRef === "all") {
      setFilteredData(sports);
    }
  }, [sportsRef, sports]);

  /* Get total amount */
  let totalAmount = 0;
  for (const sport of filteredData) {
    totalAmount = totalAmount + sport.amount;
  }

  return (
    <div className="center-container">
      {errorMessage && (
        <Notification
          message="Select Report Type !"
          success={false}
          setMessage={setErrorMessage}
        />
      )}
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Current Bets</h4>
        </div>
        <div className="card-body">
          <div className="report-form">
            <form onSubmit={handleSubmit(onSubmit)} className="row row10">
              <div className="col-lg-2 col-md-3">
                <div className="mb-4 input-group position-relative">
                  <select
                    {...register("sportsType", { required: true })}
                    className="form-select"
                    name="sportsType"
                  >
                    <option value="none" disabled="">
                      Select Report Type
                    </option>
                    <option value="sports">Sports</option>
                    <option value="casino">Casino</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 d-grid">
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </div>
            </form>
            <div className="row row10 mt-2 justify-content-between align-items-center">
              <div className="col-lg-2 col-6">
                <div className="mb-2 input-group position-relative">
                  <span className="me-2">Show</span>
                  <select className="form-select">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                  </select>
                  <span className="ms-2">Entries</span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 text-center">
                <div className="form-check form-check-inline">
                  <input
                    onClick={(e) => setSportsRef(e.target.value)}
                    type="radio"
                    className="form-check-input"
                    id="all"
                    name="filter"
                    value="all"
                  />
                  All<label className="form-check-label" htmlFor="all"></label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    onClick={(e) => setSportsRef(e.target.value)}
                    type="radio"
                    className="form-check-input"
                    id="back"
                    name="filter"
                    value="Back"
                  />
                  Back
                  <label className="form-check-label" htmlFor="back"></label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    onClick={(e) => setSportsRef(e.target.value)}
                    type="radio"
                    className="form-check-input"
                    id="lay"
                    name="filter"
                    value="Lay"
                  />
                  Lay<label className="form-check-label" htmlFor="lay"></label>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div>
                  Total Bets:{" "}
                  <span className="me-2">{filteredData.length}</span> Total
                  Amount: <span className="me-2">{totalAmount}</span>
                </div>
              </div>
              <div className="col-lg-2 col-6">
                <div className="mb-2 input-group position-relative">
                  <span className="me-2">Search:</span>
                  <input
                    type="search"
                    className="form-control"
                    placeholder={`${filteredData.length} records...`}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 table-responsive">
              <table
                role="table"
                className="table table-bordered table-striped"
              >
                <thead>
                  <tr role="row">
                    <th
                      colSpan="1"
                      role="columnheader"
                      className="report-sport"
                    >
                      Sports
                    </th>
                    <th colSpan="1" role="columnheader">
                      Event Name
                    </th>
                    <th colSpan="1" role="columnheader">
                      Market Name
                    </th>
                    <th colSpan="1" role="columnheader">
                      Nation
                    </th>
                    <th
                      colSpan="1"
                      role="columnheader"
                      className="report-amount text-end"
                    >
                      User Rate
                    </th>
                    <th
                      colSpan="1"
                      role="columnheader"
                      className="report-amount text-end"
                    >
                      Amount
                    </th>
                    <th colSpan="1" role="columnheader" className="report-date">
                      Place Date
                    </th>
                    <th
                      colSpan="1"
                      role="columnheader"
                      className="report-action"
                    >
                      <div className="text-end">
                        <div className="form-check form-check-inline">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            title="Toggle All Current Page Rows Selected"
                            style={{
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody role="rowgroup">
                  {filteredData && filteredData.length > 0
                    ? filteredData.map((sport, i) => (
                        <BetTable key={i} data={sport} />
                      ))
                    : null}
                </tbody>
              </table>
            </div>
            {sports.length > 0 && (
              <div className="custom-pagination mt-2">
                <div disabled="">First</div>
                <div disabled="">Previous</div>
                <div disabled="">Next</div>
                <div disabled="">Last</div>
                <div>
                  <span className="me-2">
                    Page <b>1 of 1</b>
                  </span>
                  <span className="me-2">| Go to Page</span>
                  <input className="form-control" type="number" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBet;