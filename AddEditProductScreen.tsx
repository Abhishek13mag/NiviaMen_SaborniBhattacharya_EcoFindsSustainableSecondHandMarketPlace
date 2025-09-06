
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { CATEGORIES } from '../constants';
import type { Product, Category } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';

interface AddEditProductScreenProps {
    productId?: string;
}

const AddEditProductScreen: React.FC<AddEditProductScreenProps> = ({ productId }) => {
    const { products, addProduct, updateProduct, navigate } = useAppContext();
    const isEditing = !!productId;
    const productToEdit = isEditing ? products.find(p => p.id === productId) : null;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState<Category>(CATEGORIES[0]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [quantity, setQuantity] = useState('1');
    const [condition, setCondition] = useState('');
    const [yearOfManufacture, setYearOfManufacture] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [weight, setWeight] = useState('');
    const [material, setMaterial] = useState('');
    const [color, setColor] = useState('');
    const [originalPackaging, setOriginalPackaging] = useState(false);
    const [manualIncluded, setManualIncluded] = useState(false);
    const [workingCondition, setWorkingCondition] = useState('');
    
    useEffect(() => {
        if (isEditing && productToEdit) {
            setTitle(productToEdit.title);
            setDescription(productToEdit.description);
            setPrice(productToEdit.price.toString());
            setCategory(productToEdit.category);
            setImagePreviews(productToEdit.imageUrls);
            setQuantity(productToEdit.quantity.toString());
            setCondition(productToEdit.condition);
            setYearOfManufacture(productToEdit.yearOfManufacture?.toString() || '');
            setBrand(productToEdit.brand);
            setModel(productToEdit.model);
            setDimensions(productToEdit.dimensions);
            setWeight(productToEdit.weight);
            setMaterial(productToEdit.material);
            setColor(productToEdit.color);
            setOriginalPackaging(productToEdit.originalPackaging);
            setManualIncluded(productToEdit.manualIncluded);
            setWorkingCondition(productToEdit.workingCondition);
        }
    }, [isEditing, productToEdit]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newPreviews: string[] = [];
            let filesProcessed = 0;

            if (files.length === 0) return;
    
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviews.push(reader.result as string);
                    filesProcessed++;
                    if (filesProcessed === files.length) {
                        setImagePreviews(prev => [...prev, ...newPreviews]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };
    
    const handleRemoveImage = (indexToRemove: number) => {
        setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (imagePreviews.length === 0) {
            alert('Please upload at least one image for the product.');
            return;
        }

        const productData = {
            title,
            description,
            price: parseFloat(price),
            category,
            imageUrls: imagePreviews,
            quantity: parseInt(quantity, 10),
            condition,
            yearOfManufacture: yearOfManufacture ? parseInt(yearOfManufacture, 10) : undefined,
            brand,
            model,
            dimensions,
            weight,
            material,
            color,
            originalPackaging,
            manualIncluded,
            workingCondition,
        };

        if (isEditing && productToEdit) {
            updateProduct({ ...productToEdit, ...productData });
        } else {
            addProduct(productData);
        }
    };
    
    return (
        <div className="container mx-auto p-4 md:p-6">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{isEditing ? 'Edit Product' : 'Add a new Product'}</h1>
                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    <fieldset>
                         <label className="block text-sm font-medium text-gray-700">Product Images</label>
                        <div className="mt-2">
                             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                                 <label htmlFor="image-upload" className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center p-2 text-gray-500 hover:border-primary-500 hover:text-primary-500 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    <span className="text-xs mt-1">Add Image</span>
                                    <input id="image-upload" name="image-upload" type="file" multiple className="sr-only" onChange={handleImageChange} accept="image/png, image/jpeg, image/webp" />
                                </label>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="border-t border-gray-200 pt-6">
                        <legend className="text-lg font-medium text-gray-900">Basic Information</legend>
                        <div className="mt-4 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
                                    <Input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Product Category</label>
                                    <Select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} className="mt-1">
                                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Product Description</label>
                                <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} required className="mt-1"></Textarea>
                            </div>
                        </div>
                    </fieldset>

                     <fieldset className="border-t border-gray-200 pt-6">
                        <legend className="text-lg font-medium text-gray-900">Pricing & Condition</legend>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">₹</span>
                                    </div>
                                    <Input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required min="0" step="0.01" className="pl-7" placeholder="0.00" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                <Input type="number" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required min="1" step="1" className="mt-1" />
                            </div>
                            <div>
                                <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
                                <Input type="text" id="condition" value={condition} onChange={e => setCondition(e.target.value)} required placeholder="e.g., Used - Like New" className="mt-1" />
                            </div>
                             <div>
                                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year of Manufacture (Optional)</label>
                                <Input type="number" id="year" value={yearOfManufacture} onChange={e => setYearOfManufacture(e.target.value)} placeholder="e.g., 2020" className="mt-1" />
                            </div>
                        </div>
                    </fieldset>
                    
                    <fieldset className="border-t border-gray-200 pt-6">
                        <legend className="text-lg font-medium text-gray-900">Product Specifications</legend>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                                <Input type="text" id="brand" value={brand} onChange={e => setBrand(e.target.value)} required className="mt-1" />
                            </div>
                             <div>
                                <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                                <Input type="text" id="model" value={model} onChange={e => setModel(e.target.value)} required className="mt-1" />
                            </div>
                            <div>
                                <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">Dimensions (L x W x H)</label>
                                <Input type="text" id="dimensions" value={dimensions} onChange={e => setDimensions(e.target.value)} required placeholder="e.g., 10cm x 5cm x 2cm" className="mt-1" />
                            </div>
                             <div>
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
                                <Input type="text" id="weight" value={weight} onChange={e => setWeight(e.target.value)} required placeholder="e.g., 250g" className="mt-1" />
                            </div>
                            <div>
                                <label htmlFor="material" className="block text-sm font-medium text-gray-700">Material</label>
                                <Input type="text" id="material" value={material} onChange={e => setMaterial(e.target.value)} required className="mt-1" />
                            </div>
                             <div>
                                <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                                <Input type="text" id="color" value={color} onChange={e => setColor(e.target.value)} required className="mt-1" />
                            </div>
                        </div>
                    </fieldset>
                    
                    <fieldset className="border-t border-gray-200 pt-6">
                        <legend className="text-lg font-medium text-gray-900">Additional Details</legend>
                        <div className="mt-4 space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input id="packaging" name="packaging" type="checkbox" checked={originalPackaging} onChange={e => setOriginalPackaging(e.target.checked)} className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                                    <label htmlFor="packaging" className="ml-2 block text-sm text-gray-900">Original Packaging Included</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="manual" name="manual" type="checkbox" checked={manualIncluded} onChange={e => setManualIncluded(e.target.checked)} className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                                    <label htmlFor="manual" className="ml-2 block text-sm text-gray-900">Manual/Instructions Included</label>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="working-condition" className="block text-sm font-medium text-gray-700">Working Condition Description</label>
                                <Textarea id="working-condition" value={workingCondition} onChange={e => setWorkingCondition(e.target.value)} rows={3} required placeholder="e.g., Perfect working order, no scratches." className="mt-1"></Textarea>
                            </div>
                        </div>
                    </fieldset>


                    <div className="flex justify-end space-x-4 pt-4">
                         <Button variant="secondary" type="button" onClick={() => navigate({ name: 'MY_LISTINGS' })}>
                            Cancel
                        </Button>
                        <Button type="submit">{isEditing ? 'Update Item' : 'Add Item'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditProductScreen;