"use client";

import React, { useState } from "react";
import axios from "axios";

type Business = {
  id: string;
  name: string;
  guests: string[];
  owner: string;
};

interface EditBusinessFormProps {
  business: Business;
  onUpdated?: (business: Business) => void;
  onDeleted?: () => void;
}

const EditBusinessForm: React.FC<EditBusinessFormProps> = ({
  business,
  onUpdated,
  onDeleted,
}) => {

  console.log(business)  
  const [name, setName] = useState(business.name);
  const [guests, setGuests] = useState<string[]>(business.guests || []);
  const [newGuest, setNewGuest] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddGuest = () => {
    const value = newGuest.trim();
    if (!value) return;
    if (guests.includes(value)) {
      setError("Ese invitado ya está en la lista.");
      return;
    }
    setGuests((prev) => [...prev, value]);
    setNewGuest("");
    setError(null);
  };


  const handleRemoveGuest = (guestToRemove: string) => {
    setGuests((prev) => prev.filter((g) => g !== guestToRemove));
    setError(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.put<Business>(`/business/${business.id}`, {
        name,
        guests,
      });

      setSuccessMessage("Negocio actualizado correctamente.");
      onUpdated?.(response.data);
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Ocurrió un error al guardar los cambios."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Seguro que querés eliminar este negocio? Esta acción no se puede deshacer."
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await axios.delete(`/businesses/${business.id}`);
      onDeleted?.();
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Ocurrió un error al eliminar el negocio."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const hasChanges =
    name !== business.name ||
    JSON.stringify(guests) !== JSON.stringify(business.guests || []);

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Editar negocio</h1>
        <p className="text-sm text-gray-500">
          Modificá el nombre, gestioná los invitados o eliminá el negocio.
        </p>
      </div>

      {/* Nombre del negocio */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Nombre del negocio</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Evento Juan & María"
        />
      </div>

      {/* Invitados */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Invitados</span>
          <span className="text-xs text-gray-500">
            {guests.length} invitado(s)
          </span>
        </div>

        {/* Input agregar invitado */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newGuest}
            onChange={(e) => {
              setNewGuest(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddGuest();
              }
            }}
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del invitado"
          />
          <button
            type="button"
            onClick={handleAddGuest}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            disabled={!newGuest.trim()}
          >
            Agregar
          </button>
        </div>

        {/* Lista de invitados */}
        {guests.length === 0 ? (
          <p className="text-xs text-gray-500">
            Todavía no hay invitados. Empezá agregando uno.
          </p>
        ) : (
          <ul className="space-y-1 max-h-52 overflow-y-auto border border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-2">
            {guests.map((guest) => (
              <li
                key={guest}
                className="flex items-center justify-between text-sm bg-gray-50 dark:bg-gray-800 rounded-md px-3 py-1.5"
              >
                <span>{guest}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveGuest(guest)}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mensajes de error / éxito */}
      {error && (
        <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="text-sm text-green-600 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg px-3 py-2">
          {successMessage}
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-sm text-red-600 hover:text-red-700 disabled:opacity-60"
        >
          {isDeleting ? "Eliminando..." : "Eliminar negocio"}
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
};

export default EditBusinessForm;
