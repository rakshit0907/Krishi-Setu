-- =====================================================
-- RUN THIS IN SUPABASE SQL EDITOR
-- Adds new regions and crops to existing database
-- =====================================================

-- UTTAR PRADESH - Lucknow - Rice (NEW)
INSERT INTO traditional_knowledge (district, crop, practice, benefit, season, source, submitted_by, verified) VALUES
('Lucknow', 'Rice', 'पुडलिंग - जल प्रबंधन (Puddling - Water management)', 'Reduces water seepage, controls weeds, creates ideal anaerobic conditions for rice', 'Kharif', 'Traditional rice farmers', 'System Admin', true),
('Lucknow', 'Rice', 'धान की रोपाई 2-3 पौधे प्रति गड्ढा (2-3 seedlings per hill)', 'Optimal plant density, better tillering, improved yield', 'Kharif', 'Agricultural heritage', 'System Admin', true),
('Lucknow', 'Rice', 'हरी खाद - ढैंचा (Green manure - Dhaincha)', 'Adds nitrogen, improves soil structure, suppresses weeds', 'Pre-Kharif', 'Traditional practice', 'System Admin', true),
('Lucknow', 'Rice', 'कम्पोस्ट का प्रयोग (Compost application)', 'Improves soil health, provides micronutrients, enhances water retention', 'Kharif', 'Local farmers', 'System Admin', true);

INSERT INTO soil_samples (district, crop, nitrogen, phosphorus, potassium, ph, organic_carbon, recommendation_note) VALUES
('Lucknow', 'Rice', 28.0, 22.0, 180.0, 6.8, 0.52, 'Nitrogen is moderate. Phosphorus is good. Potassium is slightly low (optimal: 200+ kg/ha). pH is suitable for rice. Organic carbon is adequate.');

-- PUNJAB - Ludhiana - Wheat (NEW)
INSERT INTO traditional_knowledge (district, crop, practice, benefit, season, source, submitted_by, verified) VALUES
('Ludhiana', 'Wheat', 'गेहूं-धान फसल चक्र (Wheat-Paddy rotation)', 'Optimizes nutrient use, breaks disease cycles, maintains soil health', 'Year-round', 'Punjab agricultural tradition', 'System Admin', true),
('Ludhiana', 'Wheat', 'कृषि यंत्रों से समय पर बुवाई (Timely sowing with machinery)', 'Optimal germination, better yield, efficient water use', 'Rabi', 'Modern Punjab farming', 'System Admin', true),
('Ludhiana', 'Wheat', 'गोबर और कम्पोस्ट मिश्रण (FYM and compost mix)', 'Balances nutrients, improves soil structure, reduces chemical dependency', 'Rabi', 'Traditional practice', 'System Admin', true),
('Ludhiana', 'Wheat', 'ड्रिप सिंचाई (Drip irrigation)', 'Saves water up to 40%, uniform moisture, reduces diseases', 'Rabi', 'Modern practice', 'System Admin', true);

INSERT INTO soil_samples (district, crop, nitrogen, phosphorus, potassium, ph, organic_carbon, recommendation_note) VALUES
('Ludhiana', 'Wheat', 35.0, 28.0, 240.0, 7.5, 0.58, 'Nitrogen is moderate. Phosphorus is good. Potassium is excellent. pH is slightly alkaline. Organic carbon is good. Maintain current practices.');

-- PUNJAB - Ludhiana - Rice (NEW)
INSERT INTO traditional_knowledge (district, crop, practice, benefit, season, source, submitted_by, verified) VALUES
('Ludhiana', 'Rice', 'बासमती धान की खेती (Basmati rice cultivation)', 'Premium quality, higher market price, traditional variety preservation', 'Kharif', 'Punjab basmati tradition', 'System Admin', true),
('Ludhiana', 'Rice', 'लेजर लेवलिंग (Laser leveling)', 'Uniform water distribution, saves water 20-25%, better crop stand', 'Pre-Kharif', 'Modern technique', 'System Admin', true),
('Ludhiana', 'Rice', 'सीधी बुवाई DSR (Direct Seeded Rice)', 'Saves water, reduces labor cost, timely sowing', 'Kharif', 'Modern practice', 'System Admin', true);

INSERT INTO soil_samples (district, crop, nitrogen, phosphorus, potassium, ph, organic_carbon, recommendation_note) VALUES
('Ludhiana', 'Rice', 32.0, 25.0, 190.0, 7.3, 0.55, 'Nitrogen is moderate-good. Phosphorus is good. Potassium needs supplementation. pH is suitable. Organic carbon is adequate.');

-- MAHARASHTRA - Nagpur - Cotton (NEW)
INSERT INTO traditional_knowledge (district, crop, practice, benefit, season, source, submitted_by, verified) VALUES
('Nagpur', 'Cotton', 'कपास में मिट्टी चढ़ाना (Earthing up)', 'Supports plant, improves root growth, prevents lodging', 'Kharif', 'Vidarbha cotton tradition', 'System Admin', true),
('Nagpur', 'Cotton', 'नीम तेल स्प्रे (Neem oil spray)', 'Natural pest control, prevents bollworm, safe for beneficial insects', 'Kharif', 'Traditional pest management', 'System Admin', true),
('Nagpur', 'Cotton', 'अंतरफसल - अरहर/मूंग (Intercropping with pigeon pea/moong)', 'Risk management, additional income, nitrogen fixation', 'Kharif', 'Traditional practice', 'System Admin', true),
('Nagpur', 'Cotton', 'कपास अवशेष प्रबंधन (Cotton residue management)', 'Breaks pest cycle, adds organic matter, reduces disease', 'Post-harvest', 'Modern practice', 'System Admin', true);

INSERT INTO soil_samples (district, crop, nitrogen, phosphorus, potassium, ph, organic_carbon, recommendation_note) VALUES
('Nagpur', 'Cotton', 22.0, 15.0, 200.0, 7.8, 0.38, 'Nitrogen is low. Phosphorus is low-moderate. Potassium is adequate. pH is alkaline. Organic carbon is below optimal. Recommend organic amendments and balanced NPK.');

-- MAHARASHTRA - Nashik - Sugarcane (NEW)
INSERT INTO traditional_knowledge (district, crop, practice, benefit, season, source, submitted_by, verified) VALUES
('Nashik', 'Sugarcane', 'गन्ना बीज उपचार (Sugarcane sett treatment)', 'Disease prevention, better germination, early vigor', 'Year-round', 'Traditional practice', 'System Admin', true),
('Nashik', 'Sugarcane', 'खाई विधि से रोपण (Trench planting method)', 'Deep rooting, drought tolerance, better yield', 'Planting season', 'Maharashtra tradition', 'System Admin', true),
('Nashik', 'Sugarcane', 'प्रेस मड और खोई का उपयोग (Press mud and bagasse application)', 'Improves soil structure, adds nutrients, retains moisture', 'Year-round', 'Sugar mill byproduct use', 'System Admin', true),
('Nashik', 'Sugarcane', 'ड्रिप सिंचाई (Drip irrigation)', 'Saves water 40-50%, fertigation possible, higher sugar recovery', 'Year-round', 'Modern practice', 'System Admin', true);

INSERT INTO soil_samples (district, crop, nitrogen, phosphorus, potassium, ph, organic_carbon, recommendation_note) VALUES
('Nashik', 'Sugarcane', 30.0, 20.0, 260.0, 7.0, 0.48, 'Nitrogen is moderate. Phosphorus is moderate. Potassium is good. pH is neutral-optimal. Organic carbon is adequate. Sugarcane is heavy feeder, monitor nutrients regularly.');

-- TAMIL NADU - Coimbatore - Rice (NEW)
INSERT INTO traditional_knowledge (district, crop, practice, benefit, season, source, submitted_by, verified) VALUES
('Coimbatore', 'Rice', 'குறுவை நெல் சாகுபடி (Kuruvai paddy cultivation)', 'Short duration variety, fits cropping pattern, drought escape', 'Kuruvai season', 'Tamil Nadu tradition', 'System Admin', true),
('Coimbatore', 'Rice', 'பாரம்பரிய நெல் வகைகள் (Traditional rice varieties)', 'Climate resilient, pest resistant, cultural preservation', 'Year-round', 'Heritage varieties', 'System Admin', true),
('Coimbatore', 'Rice', 'குளச் சாகுபடி முறை (Tank-based cultivation)', 'Water harvesting, community irrigation, sustainable water use', 'Year-round', 'Ancient Tamil practice', 'System Admin', true),
('Coimbatore', 'Rice', 'மட்கிய இலைகள் உரமாக்குதல் (Composting with leaves)', 'Adds organic matter, improves soil biology, nutrient recycling', 'Year-round', 'Traditional composting', 'System Admin', true);

INSERT INTO soil_samples (district, crop, nitrogen, phosphorus, potassium, ph, organic_carbon, recommendation_note) VALUES
('Coimbatore', 'Rice', 26.0, 19.0, 175.0, 6.5, 0.50, 'Nitrogen is moderate. Phosphorus is moderate. Potassium is low-moderate (supplement needed). pH is suitable. Organic carbon is adequate.');

-- KARNATAKA - Bengaluru - Ragi (NEW)
INSERT INTO traditional_knowledge (district, crop, practice, benefit, season, source, submitted_by, verified) VALUES
('Bengaluru', 'Ragi', 'ರಾಗಿ ಸಾವಯವ ಕೃಷಿ (Organic ragi cultivation)', 'Chemical-free, premium market price, soil health improvement', 'Kharif', 'Karnataka organic tradition', 'System Admin', true),
('Bengaluru', 'Ragi', 'ಅಂತರ ಬೆಳೆ - ಅವರೆ (Intercropping with field beans)', 'Nitrogen fixation, additional income, risk mitigation', 'Kharif', 'Traditional practice', 'System Admin', true),
('Bengaluru', 'Ragi', 'ಹುಳು ಗೊಬ್ಬರ (Vermicompost)', 'Rich in nutrients, improves soil structure, enhances microbial activity', 'Year-round', 'Modern organic practice', 'System Admin', true);

INSERT INTO soil_samples (district, crop, nitrogen, phosphorus, potassium, ph, organic_carbon, recommendation_note) VALUES
('Bengaluru', 'Ragi', 24.0, 16.0, 190.0, 6.2, 0.42, 'Nitrogen is low-moderate. Phosphorus is moderate. Potassium is moderate. pH is slightly acidic (ideal for ragi). Organic carbon is below optimal.');
