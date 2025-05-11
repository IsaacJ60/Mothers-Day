"use client";

import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useState } from 'react';

export interface MotherInfo {
    yourName: string;
    name: string;
    favoriteFlower: string;
    photo: File | null;
    favoriteColor: string;
    personalMessage: string;
}

interface MotherInfoFormProps {
    onSubmit: (info: MotherInfo) => void;
}

// validation schema for required fields
const validationSchema = Yup.object().shape({
    yourName: Yup.string().required('Your name is required'),
    name: Yup.string().required('Mother’s name is required'),
    favoriteFlower: Yup.string(),
    photo: Yup.mixed()
        .required('A photo is required')
        .test('fileType', 'Unsupported file format', (value) => {
            const file = value as File | null;
            if (file instanceof File && !['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                return false;
            }
            return true;
        }),
    favoriteColor: Yup.string(),
    personalMessage: Yup.string().required('A message for her is required'),
});

// Popular Mother’s Day flowers
const flowerOptions = [
    'Roses', 'Tulips', 'Lilies', 'Orchids', 'Carnations',
    'Daisies', 'Sunflowers', 'Peonies', 'Chrysanthemums', 'Hydrangeas'
];

// Popular Mother’s Day colors
const colorOptions = [
    'Red', 'Pink', 'Yellow', 'Blue', 'Purple',
    'White', 'Orange', 'Green', 'Black', 'Brown'
];

export default function MotherInfoForm({ onSubmit }: MotherInfoFormProps) {
    const [preview, setPreview] = useState<string | null>(null);

    return (
        <Formik<MotherInfo>
            initialValues={{
                yourName: '',
                name: '',
                favoriteFlower: '',
                photo: null,
                favoriteColor: '',
                personalMessage: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values);
                setSubmitting(false);
            }}
        >
            {({ values, setFieldValue, isSubmitting }) => (
                <Form className="backdrop-blur-sm max-w-2xl sm:w-md md:w-xl lg:w-2xl mx-auto p-6 space-y-4 bg-black/5 shadow-xl rounded-2xl">
                    {/* Your Name */}
                    <div>
                        <label htmlFor="yourName" className="block text-sm font-medium">
                            Your Name<i>*</i>
                        </label>
                        <Field
                            name="yourName"
                            id="yourName"
                            type="text"
                            placeholder="e.g. Kevin"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none"
                        />
                        <ErrorMessage
                            name="yourName"
                            component="p"
                            className="text-red-500 text-xs mt-1"
                        />
                    </div>

                    {/* Mother’s Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            Mother’s Name<i>*</i>
                        </label>
                        <Field
                            name="name"
                            id="name"
                            type="text"
                            placeholder="e.g. Lisa"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none"
                        />
                        <ErrorMessage
                            name="name"
                            component="p"
                            className="text-red-500 text-xs mt-1"
                        />
                    </div>

                    {/* Favorite Flower Dropdown - Headless UI */}
                    <div>
                        <label htmlFor="favoriteFlower" className="block text-sm font-medium">
                            Her Favorite Flower
                        </label>
                        <Listbox
                            value={values.favoriteFlower}
                            onChange={(val: never) => setFieldValue('favoriteFlower', val)}
                        >
                            <div className="relative mt-1">
                                <ListboxButton className="mt-1 block w-full text-left border border-gray-300 rounded-md px-3 py-2 shadow-sm text-white/50 focus:outline-none"
                                >
                                    <span className="block truncate">
                                        {values.favoriteFlower || 'Select a flower'}
                                    </span>
                                    {/* Arrow Icon */}
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                        ▼
                                    </span>
                                </ListboxButton>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-pink-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {flowerOptions.map((flower) => (
                                            <ListboxOption
                                                key={flower}
                                                value={flower}
                                                className={({ active, selected }: { active: boolean; selected: boolean }) =>
                                                    `cursor-pointer select-none px-4 py-2 ${active ? 'bg-pink-100 text-pink-900' : 'text-gray-900'
                                                    } ${selected ? 'font-semibold' : ''}`
                                                }
                                            >
                                                <span className={`${values.favoriteFlower === flower ? 'font-semibold' : 'font-normal'}`}>{flower}</span>
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </Transition>
                            </div>
                        </Listbox>
                        <ErrorMessage
                            name="favoriteFlower"
                            component="p"
                            className="text-red-500 text-xs mt-1"
                        />
                    </div>

                    {/* Favorite Photo Upload */}
                    <div>
                        <label className="block text-sm font-medium">Favorite Photo Together<i>*</i></label>
                        <div className="mt-1 flex items-center">
                            <label
                                htmlFor="photo"
                                className="cursor-pointer rounded-md px-4 py-2 text-white/50 hover:bg-pink-300/50 ease-in-out duration-200 border border-gray-300 focus:outline-none"
                            >
                                {values.photo ? 'Change Photo' : 'Upload Photo'}
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={(e) => {
                                        if (e.currentTarget.files && e.currentTarget.files[0]) {
                                            const file = e.currentTarget.files[0];
                                            setFieldValue('photo', file);
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </label>
                            {preview && (
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    width={96}
                                    height={96}
                                    unoptimized
                                    className="ml-4 h-12 w-12 rounded-md object-cover shadow-md"
                                />
                            )}
                        </div>
                        <ErrorMessage name="photo" component="p" className="text-red-500 text-xs mt-2" />
                    </div>


                    {/* Favorite Color Dropdown - Headless UI */}
                    <div>
                        <label htmlFor="favoriteColor" className="block text-sm font-medium">
                            Her Favorite Color
                        </label>
                        <Listbox
                            value={values.favoriteColor}
                            onChange={(val: never) => setFieldValue('favoriteColor', val)}
                        >
                            <div className="relative mt-1">
                                <ListboxButton className="mt-1 block w-full text-left border border-gray-300 rounded-md px-3 py-2 shadow-sm text-white/50 focus:outline-none"
                                >
                                    <span className="block truncate">
                                        {values.favoriteColor || 'Select a color'}
                                    </span>
                                    {/* Arrow Icon */}
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                        ▼
                                    </span>
                                </ListboxButton>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-pink-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {colorOptions.map((color) => (
                                            <ListboxOption
                                                key={color}
                                                value={color}
                                                className={({ active, selected }: { active: boolean; selected: boolean }) =>
                                                    `cursor-pointer select-none px-4 py-2 ${active ? 'bg-pink-100 text-pink-900' : 'text-gray-900'
                                                    } ${selected ? 'font-semibold' : ''}`
                                                }
                                            >
                                                <span className={`${values.favoriteColor === color ? 'font-semibold' : 'font-normal'}`}>{color}</span>
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </Transition>
                            </div>
                        </Listbox>
                        <ErrorMessage
                            name="favoriteColor"
                            component="p"
                            className="text-red-500 text-xs mt-1"
                        />
                    </div>

                    {/* Personal Message */}
                    <div>
                        <label htmlFor="personalMessage" className="block text-sm font-medium">
                            A Message for Her<i>*</i>
                        </label>
                        <Field
                            as="textarea"
                            name="personalMessage"
                            id="personalMessage"
                            rows={4}
                            placeholder="e.g. Thank you for everything you do!"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none"
                        />
                        <ErrorMessage
                            name="personalMessage"
                            component="p"
                            className="text-red-500 text-xs mt-1"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-white/20 text-white px-4 py-2 rounded-lg shadow-md hover:bg-white/30 float-right ease-in-out duration-200"
                    >
                        Next
                    </button>
                </Form>
            )}
        </Formik>
    );
}
