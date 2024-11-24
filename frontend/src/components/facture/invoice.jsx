import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';
import './invoice.css';

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const Data = localStorage.getItem('invoiceData');
    console.log("Données récupérées du localStorage : ", Data);

    if (!Data) {
      navigate('/');
      return;
    }

    const parsedData = JSON.parse(Data);
    setInvoiceData(parsedData);
  }, [navigate]);
  const generatePDF = () => {
    if (!invoiceData) return;
  
    const doc = new jsPDF();
  
    // Ajout du nom et des informations de l'entreprise
    doc.setFontSize(12);
    doc.text('GreenStore', 14, 20); // Nom de l'entreprise
    doc.text('N° SIRET: 27583953', 14, 25); // Numéro
    doc.text('Email: greenStore@gmail.com', 14, 30); // Adresse email
    doc.text('-------------------------------------------------', 14, 35); // Ligne de séparation
  
    // Titre de la facture
    doc.setFontSize(16);
    doc.text('Facture', 14, 45);
  
    // Initialiser la position Y
    let currentY = 50;
  
    // Parcourir les données du panier et afficher les produits pour chaque vendeur
    invoiceData.forEach((vendorData, index) => {
      doc.text(`Vendeur ID: ${vendorData.vendeurId}`, 14, currentY);
      currentY += 10;
  
      const tableData = vendorData.produit.map((item) => [
        item.produitId, // Id du produit
        item.quantite,  // Quantité
      ]);
  
      // Tableau avec les produits
      doc.autoTable({
        head: [['Produit ID', 'Quantité']],
        body: tableData,
        startY: currentY,
      });
  
      // Mise à jour de la position Y après le tableau
      currentY = doc.lastAutoTable.finalY + 10;
  
      // Total à payer pour ce vendeur
      doc.text(`Total à payer pour ce vendeur: ${vendorData.total} €`, 14, currentY);
      currentY += 10;
    });
  
    // Sauvegarde du PDF
    doc.save('facture.pdf');
  };
  
  return (
    <div className="invoice-container">
      <Navbar />
      <div className="invoice-content">
        <h2>Facture</h2>
        {invoiceData ? (
          <div>
            {invoiceData.map((vendorData, index) => (
              <div key={index}>
                <div className="invoice-details">
                  <p><strong>Vendeur ID:</strong> {vendorData.vendeurId}</p>
                  <p><strong>Total pour ce vendeur:</strong> {vendorData.total} €</p>
                </div>

                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Produit ID</th>
                      <th>Quantité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorData.produit && vendorData.produit.length > 0 ? (
                      vendorData.produit.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.produitId}</td>
                          <td>{item.quantite}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">Aucun produit dans la commande</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="total">
                  <p><strong>Total à payer pour ce vendeur:</strong> {vendorData.total} €</p>
                </div>
              </div>
            ))}

            <button className="download-pdf-btn" onClick={generatePDF}>
              Télécharger la facture en PDF
            </button>
          </div>
        ) : (
          <p>Aucune facture disponible.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Invoice;
