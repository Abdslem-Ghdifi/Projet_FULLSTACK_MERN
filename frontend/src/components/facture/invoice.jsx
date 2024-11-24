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
    const savedInvoiceData = localStorage.getItem('invoiceData');
    if (!savedInvoiceData) {
      navigate('/');
      return;
    }
    const parsedData = JSON.parse(savedInvoiceData);
    console.log(parsedData);  // Ajout d'un log pour vérifier les données récupérées
    setInvoiceData(parsedData);
  }, [navigate]);

  const generatePDF = () => {
    if (!invoiceData) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Facture', 14, 20);

    const tableData = invoiceData.produits ? invoiceData.produits.map((item) => [
      item.produit.nom,
      item.quantite,
      item.produit.prix + ' €',
      (item.produit.prix * item.quantite).toFixed(2) + ' €',
    ]) : [];

    doc.autoTable({
      head: [['Produit', 'Quantité', 'Prix Unitaire', 'Total']],
      body: tableData,
      startY: 30,
    });

    doc.text('Total à payer: ' + invoiceData.total + ' €', 14, doc.lastAutoTable.finalY + 10);
    doc.save('facture.pdf');
  };

  return (
    <div className="invoice-container">
      <Navbar />
      <div className="invoice-content">
        <h2>Facture</h2>
        {invoiceData ? (
          <div>
            <div className="invoice-details">
              <p><strong>Nom du client:</strong> {invoiceData.acheteurId}</p>
              <p><strong>Date de la commande:</strong> {new Date(invoiceData.date).toLocaleDateString()}</p>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix Unitaire</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.produits && invoiceData.produits.length > 0 ? (
                  invoiceData.produits.map((item, index) => (
                    <tr key={index}>
                      <td>{item.produit.nom}</td>
                      <td>{item.quantite}</td>
                      <td>{item.produit.prix} €</td>
                      <td>{(item.produit.prix * item.quantite).toFixed(2)} €</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Aucun produit dans la commande</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="total">
              <p><strong>Total à payer:</strong> {invoiceData.total} €</p>
            </div>

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
