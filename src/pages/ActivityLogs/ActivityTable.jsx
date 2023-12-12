import { useState } from "react";
import { config } from "../../utils/config";
import UseState from "../../hooks/UseState";

const ActivityTable = ({ data }) => {
  const ipDetailApi = config?.result?.endpoint?.ipDetails;
  const { username, ipAddress, date } = data;
  const token = localStorage.getItem("token");
  const [modalData, setModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { generatedToken } = UseState();

  const showIpDetail = (ip) => {
    fetch(`${ipDetailApi}/${ip}`, {
      method:'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify({
        token:generatedToken
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setModalData(data);
        }
      });
  };

  return (
    <>
      {showModal && modalData && (
        <>
          <div className={`fade modal-backdrop show`}></div>
          <div
            role="dialog"
            aria-modal="true"
            className="fade modal show"
            tabIndex="-1"
            style={{
              display: "block",
              paddingRight: "17px",
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-title h4">Ip Details</div>
                  <button
                    onClick={() => setShowModal(!showModal)}
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>IP:</td>
                          <td>{modalData.query}</td>
                        </tr>
                        <tr>
                          <td>City:</td>
                          <td>{modalData.city}</td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td>{modalData.country}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <tr role="row">
        <td role="cell">{username}</td>
        <td role="cell">{date}</td>
        <td role="cell">
          {ipAddress}
          <i
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              showIpDetail(ipAddress);
              setShowModal(!showModal);
            }}
            className="fas fa-eye me-2 ms-2"
          >
            {" "}
          </i>
        </td>
        <td role="cell">
          <u
            style={{
              cursor: "pointer",
            }}
          >
            Detail
          </u>
        </td>
      </tr>
    </>
  );
};

export default ActivityTable;
