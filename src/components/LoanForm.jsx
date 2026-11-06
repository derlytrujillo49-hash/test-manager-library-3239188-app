import React, { useState } from 'react';

export default function LoanForm() {
    const [documentNumber, setDocumentNumber] = useState('');
    const [selectedBooks, setSelectedBooks] = useState([]); // Array de 1 a 3 UUIDs
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddBook = (bookId) => {
        // Regla del Spec: Máximo 3 líneas por préstamo
        if (selectedBooks.length >= 3) {
            setErrorMessage('Regla de negocio: Un préstamo no puede exceder las 3 líneas de libros.');
            return;
        }
        if (selectedBooks.includes(bookId)) return;
        setSelectedBooks([...selectedBooks, bookId]);
        setErrorMessage('');
    };

    const handleCreateLoan = () => {
        // Regla del Spec: Mínimo 1 línea por préstamo
        if (selectedBooks.length === 0) {
            setErrorMessage('Debe seleccionar al menos 1 libro para procesar el préstamo.');
            return;
        }

        // Simulación del contrato POST /api/v1/loans
        const payload = {
            member_document: documentNumber,
            book_ids: selectedBooks,
            loaned_at: new Date().toISOString() // Enrutado en UTC
        };

        console.log('Enviando transacción guiada por spec (SDD):', payload);
        alert('Préstamo enviado transaccionalmente a Laravel');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Registrar Préstamo — Manager Library</h2>
            {errorMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}
            
            <input 
                type="text" 
                placeholder="Documento del Socio (member.document_number)" 
                value={documentNumber} 
                onChange={(e) => setDocumentNumber(e.target.value)}
                style={{ padding: '8px', width: '300px', display: 'block', marginBottom: '10px' }}
            />

            <button onClick={() => handleAddBook('uuid-ejemplo-libro')} style={{ marginRight: '10px' }}>
                + Agregar Libro de Muestra
            </button>

            <button onClick={handleCreateLoan} style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 12px', border: 'none', cursor: 'pointer' }}>
                Confirmar Préstamo ({selectedBooks.length} seleccionados)
            </button>
        </div>
    );
}
