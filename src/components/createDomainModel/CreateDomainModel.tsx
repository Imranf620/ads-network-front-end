import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createDomain } from "../../features/domainsSlice";
import { toast } from "react-toastify";

const CreateDomainModel = ({ setShowCreateDomainModel }: any) => {
  const dispatch = useAppDispatch();
  const [newdomain, setnewdomain] = useState({
    domain: "",
    type: "",
  });

  const createNewDomain = async () => {
    try {
      const resultAction: any = await dispatch(createDomain(newdomain));

      if (createDomain.fulfilled.match(resultAction)) {
        toast.success("Domain created successfully!");
        setnewdomain(resultAction.payload.data);
        setShowCreateDomainModel(false);
      } else {
        toast.error(resultAction.payload || "An error occurred while creating the domain");
      }
    } catch (error) {
      toast.error("An unexpected error occurred while creating the domain");
      console.error(error);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowCreateDomainModel(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Create New Domain</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter domain"
            value={newdomain.domain}
            onChange={(e) => setnewdomain({ ...newdomain, domain: e.target.value.toLowerCase() })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          />
        </div>

        <div className="mb-6">
          <select
            value={newdomain.type}
            onChange={(e) => setnewdomain({ ...newdomain, type: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">Select Type</option>
            <option value="button">Button</option>
            <option value="redirect">Redirect</option>
            <option value="template">Template</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={createNewDomain}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-200 w-full"
          >
            Create Domain
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDomainModel;
