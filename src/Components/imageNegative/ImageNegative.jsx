import React, { useState } from 'react';
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import './ImageNegative.scss'

const ImageNegativeAlgorithm = () => {
    const [resultMatrix, setResultMatrix] = useState([]);
    const [inputValues, setInputValues] = useState(Array(4).fill(Array(4).fill(0)));

    const handleInputChange = (rowIndex, colIndex, event) => {
        const { value } = event.target;
        const newValue = isNaN(value) ? 0 : Math.max(0, Math.min(15, parseInt(value, 10)));

        setInputValues((prevInputValues) => {
            const newInputValues = [...prevInputValues];
            newInputValues[rowIndex] = [...newInputValues[rowIndex]]; // create a copy of the row
            newInputValues[rowIndex][colIndex] = newValue;
            return newInputValues;
        });
    };

    const calculate = () => {
        const result = inputValues.map((row) => row.map((value) => 15 - value));

        setResultMatrix(result);
        displayMatrix('resultMatrix', result);
    };

    const displayMatrix = (resultMatrix, result) => {
        const finalMatrix = document.getElementById(resultMatrix);

        while (finalMatrix.rows.length > 0) {
            finalMatrix.deleteRow(0);
        }

        for (let i = 0; i < result.length; i++) {
            const row = finalMatrix.insertRow(i);

            for (let j = 0; j < result[i].length; j++) {
                const col = row.insertCell(j);
                col.appendChild(document.createTextNode(result[i][j]));
            }
        }
    };

    return (
        <div className='tableContainer'>
            <h1><FaQuoteLeft />  Image Negative <span>Algorithim.. </span><FaQuoteRight /></h1>
            <div className='table__table'>

                <table id="inputMatrix">
                    <tbody>
                        {inputValues.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((value, colIndex) => (
                                    <td key={colIndex}>
                                        <input
                                            value={value}
                                            min="0"
                                            max="15"
                                            type="text"
                                            onChange={(e) => handleInputChange(rowIndex, colIndex, e)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>



                <table id="resultMatrix"></table>



            </div>
            <div>

                <button onClick={calculate}>Calculate Negative</button>
            </div>

        </div>
    );
};

export default ImageNegativeAlgorithm;