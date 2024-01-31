import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UseEncryptData from "./UseEncryptData";
import UseTokenGenerator from "./UseTokenGenerator";
import { config } from "../utils/config";
import { useNavigate } from "react-router-dom";
import UseState from "./UseState";
/* Balance api */
const UseBalance = () => {
  const balanceAPi = config?.result?.endpoint?.balance;
  const token = localStorage.getItem("token");
  const { setRefetchBetsExposure } = UseState();
  const navigate = useNavigate();

  const { data: balanceData, refetch: refetchBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const generatedToken = UseTokenGenerator();
      const encryptedData = UseEncryptData(generatedToken);
      const res = await axios.post(balanceAPi, encryptedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.data?.success === false && token) {
        localStorage.clear();
        navigate("/login");
      } else if (res?.data?.success && token) {
        const data = res.data?.result;
        // console.log(data);
        setRefetchBetsExposure(data?.update);
        return data;
      }
    },
    staleTime: 6000,
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    refetchInterval:6000
  });



  return [balanceData, refetchBalance];
};

export default UseBalance;
