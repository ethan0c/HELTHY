import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Line } from "react-chartjs-2";

function WeightLogger() {
  const [weightLogs, setWeightLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const docRef = doc(db, "users", auth.currentUser!.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setWeightLogs(docSnap.data().weightLogs || []);
      }
    };
    fetchLogs();
  }, []);

  const addWeight = async (weight: number, date: string) => {
    const newLogs = [...weightLogs, { weight, date }];
    setWeightLogs(newLogs);
    await setDoc(
      doc(db, "users", auth.currentUser!.uid),
      { weightLogs: newLogs },
      { merge: true },
    );
  };

  return (
    <div>
      <button onClick={() => addWeight(75, new Date().toISOString())}>
        Add Weight
      </button>
      <Line
        data={{
          labels: weightLogs.map((log) => log.date),
          datasets: [
            {
              label: "Weight (kg)",
              data: weightLogs.map((log) => log.weight),
            },
          ],
        }}
      />
    </div>
  );
}

export default WeightLogger;
