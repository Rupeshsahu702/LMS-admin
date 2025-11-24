'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { ChevronLeft, Upload, X } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/common/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/common/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';

const formSchema = z.object({
  title: z.string().min(5, 'Course title must be at least 5 characters'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(500, 'Description must be at most 500 characters'),
  stream: z.string().min(1, 'Please select a stream'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
    errorMap: () => ({ message: 'Please select a level' }),
  }),
  price: z.string().min(1, 'Price is required'),
  discountedPrice: z.string().optional(),
  instructor: z.string().min(1, 'Please select an instructor'),
  totalDuration: z.string().optional(),
  tags: z.string().optional(),
  difficultyIndex: z.string().optional(),
  courseVersion: z.string().optional(),
});

const ManageCourse = ({ course, onBack }) => {
  const [thumbnail, setThumbnail] = useState(course?.thumbnail || null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course?.title || '',
      description: course?.description || '',
      stream: course?.stream || '',
      level: course?.level || 'Beginner',
      price: course?.price?.toString() || '',
      discountedPrice: course?.discountedPrice?.toString() || '',
      instructor: course?.instructor?._id || course?.instructor || '',
      totalDuration: course?.totalDuration || '',
      tags: course?.tags?.join(', ') || '',
      difficultyIndex: course?.difficultyIndex?.toString() || '1',
      courseVersion: course?.courseVersion || '1.0.0',
    },
  });

  const onSubmit = values => {
    // Transform data to match MongoDB schema
    const courseData = {
      ...values,
      price: parseFloat(values.price),
      discountedPrice: values.discountedPrice ? parseFloat(values.discountedPrice) : undefined,
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      difficultyIndex: values.difficultyIndex ? parseInt(values.difficultyIndex) : 1,
      thumbnail,
      slug: values.title.toLowerCase().replace(/\s+/g, '-'),
    };

    console.log('Updating course:', courseData);
    toast('Course updated successfully!', {
      description: (
        <pre className="bg-zinc-800 text-zinc-200 mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(courseData, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
    });
    onBack();
  };

  const handleThumbnailChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-full mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Courses</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Manage Courses</h1>
          <p className="text-zinc-400">
            Add, update, and manage course details from this central dashboard.
          </p>
        </div>

        {/* Form */}
        <form id="manage-course-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            {/* Course Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-course-title">Course Title</FieldLabel>
                  <Input
                    {...field}
                    id="edit-course-title"
                    placeholder="e.g., Introduction to Python"
                    aria-invalid={fieldState.invalid}
                    className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Stream and Level Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="stream"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-course-stream">Course Stream</FieldLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger
                        id="edit-course-stream"
                        aria-invalid={fieldState.invalid}
                        className="bg-zinc-800 border-zinc-700 text-zinc-100"
                      >
                        <SelectValue placeholder="Select stream" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem
                          value="Web Development"
                          className="text-zinc-200 hover:bg-zinc-700"
                        >
                          Web Development
                        </SelectItem>
                        <SelectItem
                          value="Data Science"
                          className="text-zinc-200 hover:bg-zinc-700"
                        >
                          Data Science
                        </SelectItem>
                        <SelectItem value="Design" className="text-zinc-200 hover:bg-zinc-700">
                          Design
                        </SelectItem>
                        <SelectItem
                          value="Backend Development"
                          className="text-zinc-200 hover:bg-zinc-700"
                        >
                          Backend Development
                        </SelectItem>
                        <SelectItem
                          value="Mobile Development"
                          className="text-zinc-200 hover:bg-zinc-700"
                        >
                          Mobile Development
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="level"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-course-level">Course Level</FieldLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger
                        id="edit-course-level"
                        aria-invalid={fieldState.invalid}
                        className="bg-zinc-800 border-zinc-700 text-zinc-100"
                      >
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="Beginner" className="text-zinc-200 hover:bg-zinc-700">
                          Beginner
                        </SelectItem>
                        <SelectItem
                          value="Intermediate"
                          className="text-zinc-200 hover:bg-zinc-700"
                        >
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced" className="text-zinc-200 hover:bg-zinc-700">
                          Advanced
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-course-description">Detailed Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="edit-course-description"
                      placeholder="Enter a comprehensive description of the course..."
                      rows={6}
                      className="min-h-24 resize-none bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums text-zinc-400 bg-zinc-800">
                        {field.value.length}/500 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription className="text-zinc-500">
                    Provide a detailed overview of what students will learn in this course.
                  </FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Instructor and Total Duration Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="instructor"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-course-instructor">Instructor</FieldLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger
                        id="edit-course-instructor"
                        aria-invalid={fieldState.invalid}
                        className="bg-zinc-800 border-zinc-700 text-zinc-100"
                      >
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem
                          value="67890abc12345def67890abc"
                          className="text-zinc-200 hover:bg-zinc-700"
                        >
                          Dr. Ada Lovelace
                        </SelectItem>
                        <SelectItem
                          value="67890abc12345def67890abd"
                          className="text-zinc-200 hover:bg-zinc-700"
                        >
                          Prof. Alan Turing
                        </SelectItem>
                        <SelectItem
                          value="67890abc12345def67890abe"
                          className="text-zinc-200 hover:bg-zinc-700"
                        >
                          Sarah Chen
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription className="text-zinc-500">
                      Select from registered instructors (MongoDB ObjectId reference)
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="totalDuration"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-course-duration">Total Duration</FieldLabel>
                    <Input
                      {...field}
                      id="edit-course-duration"
                      placeholder="e.g., 8 weeks or 40 hours"
                      aria-invalid={fieldState.invalid}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                    />
                    <FieldDescription className="text-zinc-500">
                      Total course duration (optional)
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Price and Discounted Price Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-course-price">Price ($)</FieldLabel>
                    <Input
                      {...field}
                      id="edit-course-price"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 500"
                      aria-invalid={fieldState.invalid}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="discountedPrice"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-course-discounted-price">
                      Discounted Price ($)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="edit-course-discounted-price"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 399"
                      aria-invalid={fieldState.invalid}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                    />
                    <FieldDescription className="text-zinc-500">
                      Optional discounted price
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Tags and Difficulty Index Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="tags"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-course-tags">Tags</FieldLabel>
                    <Input
                      {...field}
                      id="edit-course-tags"
                      placeholder="e.g., javascript, react, nodejs"
                      aria-invalid={fieldState.invalid}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                    />
                    <FieldDescription className="text-zinc-500">
                      Comma-separated tags (optional)
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="difficultyIndex"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-course-difficulty">Difficulty Index</FieldLabel>
                    <Input
                      {...field}
                      id="edit-course-difficulty"
                      type="number"
                      min="0"
                      max="5"
                      step="1"
                      placeholder="1-5"
                      aria-invalid={fieldState.invalid}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                    />
                    <FieldDescription className="text-zinc-500">
                      Rate difficulty from 0 to 5
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Course Version (Optional) */}
            <Controller
              name="courseVersion"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-course-version">Course Version</FieldLabel>
                  <Input
                    {...field}
                    id="edit-course-version"
                    placeholder="e.g., 1.0.0"
                    aria-invalid={fieldState.invalid}
                    className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                  />
                  <FieldDescription className="text-zinc-500">
                    Semantic versioning for course updates (optional)
                  </FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Course Thumbnail */}
            <div>
              <FieldLabel className="mb-3 block text-zinc-300">Course Thumbnail</FieldLabel>
              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center bg-zinc-900 hover:border-zinc-600 transition-colors">
                {!thumbnail ? (
                  <label htmlFor="edit-thumbnail-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-zinc-500 mx-auto mb-3" />
                    <p className="text-zinc-400 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-zinc-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                    <input
                      id="edit-thumbnail-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={thumbnail}
                      alt="Thumbnail preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <Button
                      type="button"
                      onClick={removeThumbnail}
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </FieldGroup>

          {/* Form Actions */}
          <Field orientation="horizontal" className="justify-end">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="manage-course-form"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Update Course
            </Button>
          </Field>
        </form>
      </div>
    </div>
  );
};

export default ManageCourse;
