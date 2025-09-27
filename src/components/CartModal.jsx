import React, { useState, useEffect } from "react";

const CartModal = ({ show, product, onClose, onSave, onRemove }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) setQuantity(product.quantity || 1);
  }, [product]);

  if (!show || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add to Cart</h2>
        <div className="flex gap-4 mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-24 h-24 object-contain rounded-xl"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-orange-500 font-bold mt-1">${product.price}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="border rounded w-16 text-center dark:bg-neutral-800"
          />
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            +
          </button>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(quantity)}
            className="px-4 py-2 rounded bg-orange-500 text-white"
          >
            Save
          </button>
          <button
            onClick={() => {
              onRemove(quantity);
              onClose();
            }}
            className="px-4 py-2 rounded bg-red-500 text-white"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
