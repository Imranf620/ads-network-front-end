import  { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllDomains } from "../../features/domainsSlice";
import { CircularProgress } from "@mui/material";

const ButtonDomain = () => {
  const dispatch = useAppDispatch();
  const [allDomains, setAllDomains] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllDomains = async () => {
      setLoading(true);
      setError(null);
      try {
        const resultAction = await dispatch(getAllDomains());
        if (getAllDomains.fulfilled.match(resultAction)) {
          const buttonDomains = resultAction.payload.data.filter(
            (domain: any) => domain.type === "button"
          );
          setAllDomains(buttonDomains);
        } else {
          setError(resultAction.error.message || "Failed to fetch domains");
        }
      } catch {
        setError("Failed to fetch domains");
      } finally {
        setLoading(false);
      }
    };

    fetchAllDomains();
  }, [dispatch]);

  // Function to generate the embed code for a selected domain
  const generateEmbedCode = (domain: string) => {
    const encodedUrl = btoa(`https://${domain}`);

    return `<script>
      const button = document.createElement('button');
      button.innerText = 'Download';
      button.onclick = () => {
        const encodedUrl = '${encodedUrl}'; 
        const decodedUrl = atob(encodedUrl); 
        window.open(decodedUrl);
      };
      document.body.appendChild(button);
    </script>`;
  };

  // Pick a random domain from the list
  const pickRandomDomain = () => {
    if (allDomains.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * allDomains.length);
    return allDomains[randomIndex].domain;
  };

  const randomDomain = pickRandomDomain();

  const copyToClipboard = (embedCode: string) => {
    navigator.clipboard
      .writeText(embedCode)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(() => setCopySuccess(false));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Generate Button Embed Code
      </h1>

      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          <div className="mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Get Embed Code for button domain
            </button>

            {isModalOpen && randomDomain && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                  <h2 className="text-xl font-semibold mb-4">
                    Embed Code for {randomDomain}
                  </h2>
                  <textarea
                    readOnly
                    value={generateEmbedCode(randomDomain)}
                    rows={8}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  ></textarea>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-gray-300 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                  >
                    Close
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(generateEmbedCode(randomDomain))
                    }
                    className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    {copySuccess ? "Copied!" : "Copy Embed Code"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonDomain;
