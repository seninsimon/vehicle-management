import { useState } from 'react';
import AxiosInterceptor from '../api/AxiosInterceptor';
import { uploadToS3 } from '../s3/s3';

export default function AddVehicle() {
  const [formData, setFormData] = useState({
    ownerName: '',
    fatherName: '',
    address: '',
    phone1: '',
    phone2: '',
    poc: '',
    vehicleNumber: '',
    vehicleName: '',
    agreementType: '',
    date: '',
    totalLoanSalePrice: '',
    downPayment: '',
    loanAmount: '',
    salePrice: '',
    cashOrBank: '',
    purchasePrice: '',
    purchaseSource: '',
    vehicleStatus: '',
    registrationNumber: '',
    manufacturingDate: '',
    description: '',
    chasisNumber: '',
    engineNumber: '',
    aadharFront: null,
    aadharBack: null,
    vehiclePhoto: null,
    rcPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload files to S3 and get back URLs
      const uploadedFiles = {};

      if (formData.aadharFront)
        uploadedFiles.aadharPhotoFront = await uploadToS3(formData.aadharFront);
      if (formData.aadharBack)
        uploadedFiles.aadharPhotoBack = await uploadToS3(formData.aadharBack);
      if (formData.vehiclePhoto)
        uploadedFiles.vehiclePhoto = await uploadToS3(formData.vehiclePhoto);
      if (formData.rcPhoto)
        uploadedFiles.rcPhoto = await uploadToS3(formData.rcPhoto);

      const payload = {
        ...formData,
        ...uploadedFiles,
      };

      // Remove local File objects before sending
      delete payload.aadharFront;
      delete payload.aadharBack;
      delete payload.vehiclePhoto;
      delete payload.rcPhoto;

      const res = await AxiosInterceptor.post('/vehicles/add', payload);

      alert('Vehicle added successfully!');
      console.log(res.data);

      // Optional: reset form
      setFormData((prev) => ({
        ...prev,
        ownerName: '',
        fatherName: '',
        address: '',
        phone1: '',
        phone2: '',
        poc: '',
        vehicleNumber: '',
        vehicleName: '',
        agreementType: '',
        date: '',
        totalLoanSalePrice: '',
        downPayment: '',
        loanAmount: '',
        salePrice: '',
        cashOrBank: '',
        purchasePrice: '',
        purchaseSource: '',
        vehicleStatus: '',
        registrationNumber: '',
        manufacturingDate: '',
        description: '',
        chasisNumber: '',
        engineNumber: '',
        aadharFront: null,
        aadharBack: null,
        vehiclePhoto: null,
        rcPhoto: null,
      }));
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit vehicle.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Vehicle</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input name="ownerName" onChange={handleChange} value={formData.ownerName} placeholder="Owner Name" className="input" />
        <input name="fatherName" onChange={handleChange} value={formData.fatherName} placeholder="Father Name" className="input" />
        <textarea name="address" onChange={handleChange} value={formData.address} placeholder="Address" className="input" />
        <input name="phone1" onChange={handleChange} value={formData.phone1} placeholder="Phone 1" className="input" />
        <input name="phone2" onChange={handleChange} value={formData.phone2} placeholder="Phone 2" className="input" />
        <input name="poc" onChange={handleChange} value={formData.poc} placeholder="Point of Contact (POC)" className="input" />
        <input name="vehicleNumber" onChange={handleChange} value={formData.vehicleNumber} placeholder="Vehicle Number" className="input" />
        <input name="vehicleName" onChange={handleChange} value={formData.vehicleName} placeholder="Vehicle Name" className="input" />
        <input name="agreementType" onChange={handleChange} value={formData.agreementType} placeholder="Agreement Type" className="input" />
        <input type="date" name="date" onChange={handleChange} value={formData.date} className="input" />
        <input name="totalLoanSalePrice" onChange={handleChange} value={formData.totalLoanSalePrice} placeholder="Total Loan Sale Price" type="number" className="input" />
        <input name="downPayment" onChange={handleChange} value={formData.downPayment} placeholder="Down Payment" type="number" className="input" />
        <input name="loanAmount" onChange={handleChange} value={formData.loanAmount} placeholder="Loan Amount" type="number" className="input" />
        <input name="salePrice" onChange={handleChange} value={formData.salePrice} placeholder="Sale Price" type="number" className="input" />
        <input name="cashOrBank" onChange={handleChange} value={formData.cashOrBank} placeholder="Cash or Bank" className="input" />
        <input name="purchasePrice" onChange={handleChange} value={formData.purchasePrice} placeholder="Purchase Price" type="number" className="input" />
        <input name="purchaseSource" onChange={handleChange} value={formData.purchaseSource} placeholder="Customer / Showroom Purchase" className="input" />
        <input name="vehicleStatus" onChange={handleChange} value={formData.vehicleStatus} placeholder="Vehicle Status" className="input" />
        <input name="registrationNumber" onChange={handleChange} value={formData.registrationNumber} placeholder="Registration Number" className="input" />
        <input type="date" name="manufacturingDate" onChange={handleChange} value={formData.manufacturingDate} className="input" />
        <textarea name="description" onChange={handleChange} value={formData.description} placeholder="Description" className="input col-span-2" />
        <input name="chasisNumber" onChange={handleChange} value={formData.chasisNumber} placeholder="Chassis Number" className="input" />
        <input name="engineNumber" onChange={handleChange} value={formData.engineNumber} placeholder="Engine Number" className="input" />

        {/* File Uploads */}
        <label className="block">
          Aadhar Photo Front
          <input type="file" name="aadharFront" onChange={handleChange} className="mt-1" />
        </label>
        <label className="block">
          Aadhar Photo Back
          <input type="file" name="aadharBack" onChange={handleChange} className="mt-1" />
        </label>
        <label className="block">
          Vehicle Photo
          <input type="file" name="vehiclePhoto" onChange={handleChange} className="mt-1" />
        </label>
        <label className="block">
          RC Photo
          <input type="file" name="rcPhoto" onChange={handleChange} className="mt-1" />
        </label>

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
