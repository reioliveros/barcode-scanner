import { useState } from "react";
import { describeItem } from "../utils/describeItem";
import { isWholeNumber } from "../utils/isWholeNumber"
import { Search, Save, X, Trash, Pencil } from "lucide-react";

const History = ({ history, myProducts, onClear, onChangeItem, onSave, onDelete }) => {
  const [editingBarcode, setEditinBarcode] = useState(null);
  const [draft, setDraft] = useState({});

  return (
    <div className="history zebra">
      <table>
        <caption>Recently Scanned Items:</caption>
        <tbody>
{/* HEADERS */}
          <tr>
            <th>Delete</th>
            <th>API Status</th>
            <th colSpan={2}>Barcode</th>
            <th>Brand</th>
            <th>Item Name</th>
            <th>Shelf Life</th>
            <th>Use By (From Today)</th>
            <th>Edit</th>
          </tr>

          {history.map((item) => {
            const info = describeItem(item, myProducts[item.barcode]);
            return (
              <tr key={item.barcode}>
                <td>
                  <button
                    title="Delete"
                    aria-label="Delete this item and its saved shelf life"
                    className="deleteBtn"
                    onClick={() => {
                      onDelete(item.barcode);
                    }}
                  >
                    <Trash />
                  </button>
                </td>
{/* API STATUS */}
                <td className={item.found ? "foundItem" : "notFoundItem"}>
                  {item.found ? "Found" : "Not Found"}
                </td>

{/* BARCODE */}
                <td className="barcode">{item.barcode} </td>

{/* SEARCH */}
                <td className="tableSearchBtn">
                  <button
                    title="Search"
                    aria-label="Lookup barcode"
                    onClick={() => {
                      onChangeItem(item.barcode);
                    }}
                  >
                    <Search />
                  </button>
                </td>

{/* BRAND */}
                <td>
                  {editingBarcode === item.barcode ? (
                    <input
                      type="text"
                      placeholder="brand"
                      defaultValue={info.brand}
                      onChange={(e) => {setDraft( prev => ({...prev, brand: e.target.value}))}}
                    />
                  ) : (
                    info.brand || "Unknown Brand"
                  )}
                </td>

{/* NAME */}
                <td>
                  {editingBarcode === item.barcode ? (
                    <input
                      type="text"
                      placeholder="item name"
                      defaultValue={info.name}
                      onChange={(e) => {setDraft( prev => ({...prev, name: e.target.value}))}}
                    />
                  ) : (
                    info.name || "Unknown Name"
                  )}
                </td>

{/* SHELF LIFE */}
                <td>
                  {editingBarcode === item.barcode ? (
                    <input
                      type="number"
                      placeholder="shelf life"
                      defaultValue={info.shelfLifeDays}
                      onChange={(e) => {setDraft( prev => ({...prev, shelfLifeDays: e.target.value}))}}
                    />
                  ) : (
                    info.shelfLifeDays || "???"
                  )}
                </td>
{/* USE BY */}
                <td>{info.useBy || "???"}</td>

{/* EDIT */}
                <td>
                  {editingBarcode !== item.barcode && (
                    <button
                      title="Edit"
                      aria-label="Edit item brand, namd, and shelf life"
                      className="editIconBtn"
                      onClick={() => {
                        if (editingBarcode !== item.barcode) {
                          setDraft({brand: info.brand, name: info.name, shelfLifeDays: info.shelfLifeDays})
                          setEditinBarcode(item.barcode);
                        }
                      }}
                    >
                      <Pencil />
                    </button>
                  )}

                  {editingBarcode === item.barcode && (
                    <div className="saveCancelBtns">
                      <button 
                        title="Save"
                        aria-label="Save inputted item brand, name, and shelf life"
                        onClick={() => {
                          const days = Number(draft.shelfLifeDays)
                          if( draft.shelfLifeDays && !isWholeNumber(days)){
                            return;
                          }
                          onSave({brand: draft.brand, name: draft.name, shelfLifeDays: days});
                          setDraft({})
                          setEditinBarcode(null);
                        }}>
                        <Save />
                      </button>

                      <button
                      title="Cancel"
                      aria-label="Cancel editing product"
                      onClick={() => {
                        setEditinBarcode(null);
                        setDraft({});
                      }}>
                        <X></X>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {history.length > 0 ? (
        <button onClick={onClear}>Clear History</button>
      ) : (
        ""
      )}
    </div>
  );
};

export default History;
