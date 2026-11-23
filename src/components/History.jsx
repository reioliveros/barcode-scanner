import { useState } from "react";
import { describeItem } from "../utils/describeItem";
import { isPositiveWholeNumber } from "../utils/isPositiveWholeNumber"
import { Search, Save, X, Trash, Pencil } from "lucide-react";

const History = ({ history, myProducts, onClear, onChangeItem, onSave, onDelete, onClearData, onExport }) => {
  const [editingBarcode, setEditingBarcode] = useState(null);
  const [draft, setDraft] = useState({});
  const [editError, setEditError] = useState('');

  return (
    <div className="history zebra">
      {history.length > 0 &&
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
            const isEditing = editingBarcode === item.barcode;
            return (
              <tr key={item.barcode}>
{/* DELETE */}
                <td>
                  <button
                    title="Delete"
                    aria-label="Delete this item and its saved shelf life"
                    className="deleteBtn"
                    onClick={() => {
                      if(onDelete(item.barcode) && isEditing)
                        setEditingBarcode(null);
                    }}
                  >
                    <Trash />
                  </button>
                </td>
{/* API STATUS */}
                <td className={item.found ? "foundItem" : "error"}>
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
                  {isEditing ? (
                    <input
                      type="text"
                      placeholder="brand"
                      value={draft.brand}
                      onChange={(e) => {setDraft( prev => ({...prev, brand: e.target.value}))}}
                    />
                  ) : (
                    info.brand || "Unknown Brand"
                  )}
                </td>

{/* NAME */}
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      placeholder="item name"
                      value={draft.name}
                      onChange={(e) => {setDraft( prev => ({...prev, name: e.target.value}))}}
                    />
                  ) : (
                    info.name || "Unknown Name"
                  )}
                </td>

{/* SHELF LIFE */}
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      placeholder="Shelf Life"
                      value={draft.shelfLifeDays ?? ''}
                      onChange={(e) => {setDraft( prev => ({...prev, shelfLifeDays: e.target.value}))}}
                    />
                  ) : (
                    info.shelfLifeDays || "???"
                  )}
                  {isEditing && editError && <p className="error">{editError}</p>}
                </td>
{/* USE BY */}
                <td>{info.useBy || "???"}</td>

{/* EDIT */}
                <td>
                  {editingBarcode !== item.barcode && (
                    <button
                      title="Edit"
                      aria-label="Edit item brand, name, and shelf life"
                      className="editIconBtn"
                      onClick={() => {
                        setDraft({brand: info.brand ?? '', name: info.name ?? '', shelfLifeDays: info.shelfLifeDays ?? ''})
                        setEditingBarcode(item.barcode);
                        setEditError('');
                      }}
                    >
                      <Pencil />
                    </button>
                  )}

                  {isEditing && (
                    <div className="saveCancelBtns">
                      <button 
                        title="Save"
                        aria-label="Save inputted item brand, name, and shelf life"
                        onClick={() => {

                          const text = draft.shelfLifeDays;
                          let days = null;

                          if (draft.shelfLifeDays !== '') {
                            days = Number(text);
                            if( !isPositiveWholeNumber(days) ){
                              setEditError('Shelf Life must be a positive whole number');
                              return;
                            }                            
                          }
                          setEditError('');
                          onSave(item.barcode, {brand: draft.brand.trim(), name: draft.name.trim(), shelfLifeDays: days});
                          setEditingBarcode(null);
                          setDraft({})

                        }}>
                        <Save />
                      </button>

                      <button
                      title="Cancel"
                      aria-label="Cancel editing product"
                      onClick={() => {
                        setEditingBarcode(null);
                        setDraft({});
                        setEditError('')
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
      }
{/* CLEAR HISTORY */}
      <div>
      {history.length > 0 ? (
        <button onClick={onClear}>Clear History</button>
      ) : (
        "No Scans Yet"
      )}
      </div>

{/* CLEAR DATA / EXPORT */}
      <div>
      {Object.keys(myProducts).length !== 0 ? (
        <div>
          <button onClick={onClearData}>Clear Data</button>
          <button onClick={onExport} >Export Data</button>
        </div>
      ) : (
        ""
      )}
      </div>
    </div>
  );
};

export default History;
