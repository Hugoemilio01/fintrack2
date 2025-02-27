import React, { useState } from "react";
import { motion } from "framer-motion";

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // Para manejar errores

  const addTransaction = () => {
    if (!amount || !description) {
      setError("Por favor, ingresa tanto el monto como la descripción.");
      return;
    }
    // Asegurarse de no mutar el estado original directamente
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { amount: parseFloat(amount), description },
    ]);
    setAmount("");
    setDescription("");
    setError(""); // Limpiar el mensaje de error
  };

  const totalBalance = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        💰 FinTrack - Administrador de Gastos
      </motion.h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-lg mb-4">Saldo Total: ${totalBalance.toFixed(2)}</p>
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-2 p-2 rounded bg-gray-700 text-white w-full"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 p-2 rounded bg-gray-700 text-white w-full"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full"
          onClick={addTransaction}
        >
          Agregar Gasto / Ingreso
        </button>
      </div>

      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Historial</h2>
        <ul className="bg-gray-800 p-4 rounded-lg">
          {transactions.map((t, index) => (
            <motion.li
              key={index}
              className={`p-2 ${
                t.amount < 0 ? "text-red-400" : "text-green-400"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {t.description}: ${t.amount.toFixed(2)}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTracker;
