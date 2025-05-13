import React, { useState } from 'react';
import axios from 'axios';
import './NewsCategorizer.css'

const NewsCategorizer = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        text: text
      });
      setCategory(response.data.category);
      setConfidence(response.data.confidence);
    } catch (error) {
      console.error("Error predicting category:", error);
      alert('Error making prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid" style={{minHeight:"110vh", backgroundColor: '#1e2a47', padding: '30px 0'}}>
        <h2 className="text-center text-white mb-4 fw-bold">News Categorizer</h2>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg rounded-lg p-4 ">
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <textarea
                  value={text}
                  onChange={handleInputChange}
                  placeholder="Enter the article text here"
                  rows="15"
                  className="form-control"
                  cols="60"
                  style={{ resize: 'none', borderRadius: '8px' }}
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className={`btn btn-warning w-50 ${loading ? 'disabled' : ''}`}
                  type="submit"
                  disabled={loading}
                  style={{ fontWeight: 'bold' }}
                >
                  {loading ? 'Predicting...' : 'Predict Category'}
                </button>
              </div>
            </form>

            {category && (
              <div className="mt-4 text-center">
                <h4 className="text-dark">Predicted Category: <span className="text-danger">{category}</span></h4>
                <p className="text-info">Confidence: <strong>{confidence}%</strong></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCategorizer;
