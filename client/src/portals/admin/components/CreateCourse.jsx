'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/common/components/ui/field';
import { InputGroupTextarea } from '@/common/components/ui/input-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
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
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  price: z.string().min(1, 'Price is required'),
  discountedPrice: z.string().optional(),
  instructor: z.string().min(1, 'Please select an instructor'),
  totalDuration: z.string().optional(),
  tags: z.string().optional(),
  difficultyIndex: z.string().optional(),
});

const CreateCourse = ({ onBack }) => {
  // Modules state matching MongoDB schema
  const [modules, setModules] = useState([
    {
      id: 1,
      title: '',
      maxTimelineInDays: '',
      description: '',
      textLinks: [''],
      videoLinks: [''],
      tasks: [
        {
          id: 1,
          title: '',
          description: '',
        },
      ],
      quizzes: [
        {
          id: 1,
          title: '',
          questions: [
            {
              questionText: '',
              options: ['', ''],
              correctAnswer: 0,
            },
          ],
        },
      ],
      order: 0,
    },
  ]);

  // Capstone projects state
  const [capstoneProjects, setCapstoneProjects] = useState([
    {
      id: 1,
      title: '',
      description: '',
    },
  ]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      stream: '',
      level: 'Beginner',
      price: '',
      discountedPrice: '',
      instructor: '',
      totalDuration: '',
      tags: '',
      difficultyIndex: '1',
    },
  });

  const onSubmit = values => {
    // Transform data to match MongoDB schema
    const courseData = {
      ...values,
      price: parseFloat(values.price),
      discountedPrice: values.discountedPrice ? parseFloat(values.discountedPrice) : undefined,
      tags: values.tags
        ? values.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(Boolean)
        : [],
      difficultyIndex: values.difficultyIndex ? parseInt(values.difficultyIndex) : 1,
      modules: modules.map((module, index) => ({
        title: module.title,
        maxTimelineInDays: module.maxTimelineInDays ? parseInt(module.maxTimelineInDays) : 7,
        description: module.description,
        textLinks: module.textLinks.filter(link => link.trim() !== ''),
        videoLinks: module.videoLinks.filter(link => link.trim() !== ''),
        tasks: module.tasks.map(task => ({
          title: task.title,
          description: task.description,
        })),
        quizzes: module.quizzes.map(quiz => ({
          title: quiz.title,
          questions: quiz.questions.map(q => ({
            questionText: q.questionText,
            options: q.options.filter(opt => opt.trim() !== ''),
            correctAnswer: q.correctAnswer,
          })),
        })),
        order: index,
      })),
      capstoneProjects: capstoneProjects.map(project => ({
        title: project.title,
        description: project.description,
      })),
      isPublished: false,
      enrolledCount: 0,
    };

    console.log('Creating course:', courseData);
    toast('Course created successfully!', {
      description: 'Your course has been added to the platform.',
      position: 'bottom-right',
    });
    onBack();
  };

  // Module management functions
  const addModule = () => {
    setModules([
      ...modules,
      {
        id: modules.length + 1,
        title: '',
        maxTimelineInDays: '',
        description: '',
        textLinks: [''],
        videoLinks: [''],
        tasks: [
          {
            id: 1,
            title: '',
            description: '',
          },
        ],
        quizzes: [
          {
            id: 1,
            title: '',
            questions: [
              {
                questionText: '',
                options: ['', ''],
                correctAnswer: 0,
              },
            ],
          },
        ],
        order: modules.length,
      },
    ]);
  };

  const deleteModule = moduleId => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const updateModule = (moduleId, field, value) => {
    setModules(modules.map(m => (m.id === moduleId ? { ...m, [field]: value } : m)));
  };

  // Text/Video Link management
  const addTextLink = moduleId => {
    setModules(
      modules.map(m => (m.id === moduleId ? { ...m, textLinks: [...m.textLinks, ''] } : m)),
    );
  };

  const updateTextLink = (moduleId, linkIndex, value) => {
    setModules(
      modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              textLinks: m.textLinks.map((link, idx) => (idx === linkIndex ? value : link)),
            }
          : m,
      ),
    );
  };

  const removeTextLink = (moduleId, linkIndex) => {
    setModules(
      modules.map(m =>
        m.id === moduleId
          ? { ...m, textLinks: m.textLinks.filter((_, idx) => idx !== linkIndex) }
          : m,
      ),
    );
  };

  const addVideoLink = moduleId => {
    setModules(
      modules.map(m => (m.id === moduleId ? { ...m, videoLinks: [...m.videoLinks, ''] } : m)),
    );
  };

  const updateVideoLink = (moduleId, linkIndex, value) => {
    setModules(
      modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              videoLinks: m.videoLinks.map((link, idx) => (idx === linkIndex ? value : link)),
            }
          : m,
      ),
    );
  };

  const removeVideoLink = (moduleId, linkIndex) => {
    setModules(
      modules.map(m =>
        m.id === moduleId
          ? { ...m, videoLinks: m.videoLinks.filter((_, idx) => idx !== linkIndex) }
          : m,
      ),
    );
  };

  // Quiz management functions
  const addQuiz = moduleId => {
    setModules(
      modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              quizzes: [
                ...m.quizzes,
                {
                  id: m.quizzes.length + 1,
                  title: '',
                  questions: [
                    {
                      questionText: '',
                      options: ['', ''],
                      correctAnswer: 0,
                    },
                  ],
                },
              ],
            }
          : m,
      ),
    );
  };

  const deleteQuiz = (moduleId, quizId) => {
    setModules(
      modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              quizzes: m.quizzes.filter(q => q.id !== quizId),
            }
          : m,
      ),
    );
  };

  const updateQuiz = (moduleId, quizId, field, value) => {
    setModules(
      modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              quizzes: m.quizzes.map(q => (q.id === quizId ? { ...q, [field]: value } : q)),
            }
          : m,
      ),
    );
  };

  // Question management
  const addQuestion = (moduleId, quizId) => {
    setModules(
      modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              quizzes: m.quizzes.map(q =>
                q.id === quizId
                  ? {
                      ...q,
                      questions: [
                        ...q.questions,
                        {
                          questionText: '',
                          options: ['', ''],
                          correctAnswer: 0,
                        },
                      ],
                    }
                  : q,
              ),
            }
          : m,
      ),
    );
  };

  const deleteQuestion = (moduleId, quizId, questionIndex) => {
    setModules(
      modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              quizzes: m.quizzes.map(q =>
                q.id === quizId
                  ? {
                      ...q,
                      questions: q.questions.filter((_, idx) => idx !== questionIndex),
                    }
                  : q,
              ),
            }
          : m,
      ),
    );
  };

  const updateQuestion = (moduleId, quizId, questionIndex, field, value) => {
    setModules(
      modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              quizzes: m.quizzes.map(q =>
                q.id === quizId
                  ? {
                      ...q,
                      questions: q.questions.map((question, idx) =>
                        idx === questionIndex ? { ...question, [field]: value } : question,
                      ),
                    }
                  : q,
              ),
            }
          : m,
      ),
    );
  };

  const addOption = (moduleId, quizId, questionIndex) => {
    setModules(
      modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              quizzes: m.quizzes.map(q =>
                q.id === quizId
                  ? {
                      ...q,
                      questions: q.questions.map((question, idx) =>
                        idx === questionIndex
                          ? { ...question, options: [...question.options, ''] }
                          : question,
                      ),
                    }
                  : q,
              ),
            }
          : m,
      ),
    );
  };

  const updateOption = (moduleId, quizId, questionIndex, optionIndex, value) => {
    setModules(
      modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              quizzes: m.quizzes.map(q =>
                q.id === quizId
                  ? {
                      ...q,
                      questions: q.questions.map((question, idx) =>
                        idx === questionIndex
                          ? {
                              ...question,
                              options: question.options.map((opt, optIdx) =>
                                optIdx === optionIndex ? value : opt,
                              ),
                            }
                          : question,
                      ),
                    }
                  : q,
              ),
            }
          : m,
      ),
    );
  };

  // Capstone project management
  const addCapstoneProject = () => {
    setCapstoneProjects([
      ...capstoneProjects,
      {
        id: capstoneProjects.length + 1,
        title: '',
        description: '',
      },
    ]);
  };

  const deleteCapstoneProject = projectId => {
    setCapstoneProjects(capstoneProjects.filter(p => p.id !== projectId));
  };

  const updateCapstoneProject = (projectId, field, value) => {
    setCapstoneProjects(
      capstoneProjects.map(p => (p.id === projectId ? { ...p, [field]: value } : p)),
    );
  };

  const addRequirement = projectId => {
    setCapstoneProjects(
      capstoneProjects.map(p =>
        p.id === projectId ? { ...p, requirements: [...p.requirements, ''] } : p,
      ),
    );
  };

  const updateRequirement = (projectId, reqIndex, value) => {
    setCapstoneProjects(
      capstoneProjects.map(p =>
        p.id === projectId
          ? {
              ...p,
              requirements: p.requirements.map((req, idx) => (idx === reqIndex ? value : req)),
            }
          : p,
      ),
    );
  };

  const removeRequirement = (projectId, reqIndex) => {
    setCapstoneProjects(
      capstoneProjects.map(p =>
        p.id === projectId
          ? { ...p, requirements: p.requirements.filter((_, idx) => idx !== reqIndex) }
          : p,
      ),
    );
  };

  const addDeliverable = projectId => {
    setCapstoneProjects(
      capstoneProjects.map(p =>
        p.id === projectId ? { ...p, deliverables: [...p.deliverables, ''] } : p,
      ),
    );
  };

  const updateDeliverable = (projectId, delIndex, value) => {
    setCapstoneProjects(
      capstoneProjects.map(p =>
        p.id === projectId
          ? {
              ...p,
              deliverables: p.deliverables.map((del, idx) => (idx === delIndex ? value : del)),
            }
          : p,
      ),
    );
  };

  const removeDeliverable = (projectId, delIndex) => {
    setCapstoneProjects(
      capstoneProjects.map(p =>
        p.id === projectId
          ? { ...p, deliverables: p.deliverables.filter((_, idx) => idx !== delIndex) }
          : p,
      ),
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-full mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Courses</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Create a New Course</h1>
          <p className="text-zinc-400">
            Fill in the details below to add a new course to the platform.
          </p>
        </div>

        {/* Form */}
        <form id="create-course-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Course Details Section */}
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-zinc-100">Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                {/* Course Title */}
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="course-title" className="text-zinc-300 font-medium">
                        Course Title
                      </FieldLabel>
                      <Input
                        {...field}
                        id="course-title"
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
                        <FieldLabel htmlFor="course-stream" className="text-zinc-300 font-medium">
                          Course Stream
                        </FieldLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger
                            id="course-stream"
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
                        <FieldLabel htmlFor="course-level" className="text-zinc-300 font-medium">
                          Course Level
                        </FieldLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger
                            id="course-level"
                            aria-invalid={fieldState.invalid}
                            className="bg-zinc-800 border-zinc-700 text-zinc-100"
                          >
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem
                              value="Beginner"
                              className="text-zinc-200 hover:bg-zinc-700"
                            >
                              Beginner
                            </SelectItem>
                            <SelectItem
                              value="Intermediate"
                              className="text-zinc-200 hover:bg-zinc-700"
                            >
                              Intermediate
                            </SelectItem>
                            <SelectItem
                              value="Advanced"
                              className="text-zinc-200 hover:bg-zinc-700"
                            >
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
                      <FieldLabel htmlFor="short-description" className="text-zinc-300 font-medium">
                        Course Description
                      </FieldLabel>
                      <InputGroupTextarea
                        {...field}
                        id="short-description"
                        placeholder="Describe the course in a few sentences..."
                        rows={4}
                        className="resize-none bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                        aria-invalid={fieldState.invalid}
                      />
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
                        <FieldLabel
                          htmlFor="course-instructor"
                          className="text-zinc-300 font-medium"
                        >
                          Instructor
                        </FieldLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger
                            id="course-instructor"
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
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Controller
                    name="totalDuration"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="total-duration" className="text-zinc-300 font-medium">
                          Total Duration
                        </FieldLabel>
                        <Input
                          {...field}
                          id="total-duration"
                          placeholder="e.g., 8 weeks or 40 hours"
                          aria-invalid={fieldState.invalid}
                          className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                        />
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
                        <FieldLabel htmlFor="course-price" className="text-zinc-300 font-medium">
                          Course Price
                        </FieldLabel>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                            $
                          </span>
                          <Input
                            {...field}
                            id="course-price"
                            type="number"
                            step="0.01"
                            placeholder="500"
                            aria-invalid={fieldState.invalid}
                            className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 pl-8"
                          />
                        </div>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Controller
                    name="discountedPrice"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="discounted-price"
                          className="text-zinc-300 font-medium"
                        >
                          Discounted Price (Optional)
                        </FieldLabel>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                            $
                          </span>
                          <Input
                            {...field}
                            id="discounted-price"
                            type="number"
                            step="0.01"
                            placeholder="399"
                            aria-invalid={fieldState.invalid}
                            className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 pl-8"
                          />
                        </div>
                      </Field>
                    )}
                  />
                </div>

                {/* Tags and Difficulty Index Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Controller
                    name="tags"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="course-tags" className="text-zinc-300 font-medium">
                          Tags (Optional)
                        </FieldLabel>
                        <Input
                          {...field}
                          id="course-tags"
                          placeholder="e.g., javascript, react, nodejs"
                          className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                        />
                      </Field>
                    )}
                  />

                  <Controller
                    name="difficultyIndex"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel
                          htmlFor="difficulty-index"
                          className="text-zinc-300 font-medium"
                        >
                          Difficulty Index (0-5)
                        </FieldLabel>
                        <Input
                          {...field}
                          id="difficulty-index"
                          type="number"
                          min="0"
                          max="5"
                          step="1"
                          placeholder="1"
                          className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                        />
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          {/* Modules Section */}
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-6">Modules</h2>
            <div className="space-y-6">
              {modules.map((module, moduleIndex) => (
                <Card key={module.id} className="border-zinc-800 bg-zinc-900">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-zinc-100">
                      Module {moduleIndex + 1}
                    </CardTitle>
                    {modules.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteModule(module.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-950"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Module
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <FieldGroup>
                      {/* Module Title and Timeline */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field>
                          <FieldLabel className="text-zinc-300 font-medium">
                            Module Title
                          </FieldLabel>
                          <Input
                            value={module.title}
                            onChange={e => updateModule(module.id, 'title', e.target.value)}
                            placeholder="e.g., Variables and Data Types"
                            className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                          />
                        </Field>

                        <Field>
                          <FieldLabel className="text-zinc-300 font-medium">
                            Timeline of the Module
                          </FieldLabel>
                          <Input
                            value={module.timeline}
                            onChange={e => updateModule(module.id, 'timeline', e.target.value)}
                            placeholder="e.g., Week 1 - 3 hours"
                            className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                          />
                        </Field>
                      </div>

                      {/* Module Description */}
                      <Field>
                        <FieldLabel className="text-zinc-300 font-medium">
                          Module Description
                        </FieldLabel>
                        <InputGroupTextarea
                          value={module.description}
                          onChange={e => updateModule(module.id, 'description', e.target.value)}
                          placeholder="Describe what students will learn in this module..."
                          rows={3}
                          className="resize-none bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                        />
                      </Field>

                      {/* Text Content Links */}
                      <div>
                        <FieldLabel className="text-zinc-300 font-medium mb-3">
                          Text Content Links
                        </FieldLabel>
                        <div className="space-y-2">
                          {module.textLinks.map((link, linkIndex) => (
                            <div key={linkIndex} className="flex items-center gap-3">
                              <Input
                                value={link}
                                onChange={e => updateTextLink(module.id, linkIndex, e.target.value)}
                                placeholder="https://example.com/reading-material"
                                className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                              />
                              {module.textLinks.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTextLink(module.id, linkIndex)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addTextLink(module.id)}
                          className="mt-3 text-blue-400 hover:text-white hover:bg-blue-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Text Link
                        </Button>
                      </div>

                      {/* Video Content Links */}
                      <div>
                        <FieldLabel className="text-zinc-300 font-medium mb-3">
                          Video Content Links
                        </FieldLabel>
                        <div className="space-y-2">
                          {module.videoLinks.map((link, linkIndex) => (
                            <div key={linkIndex} className="flex items-center gap-3">
                              <Input
                                value={link}
                                onChange={e =>
                                  updateVideoLink(module.id, linkIndex, e.target.value)
                                }
                                placeholder="https://youtube.com/watch?v=..."
                                className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                              />
                              {module.videoLinks.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeVideoLink(module.id, linkIndex)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addVideoLink(module.id)}
                          className="mt-3 text-blue-400 hover:text-white hover:bg-blue-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Video Link
                        </Button>
                      </div>

                      {/* Quizzes */}
                      <div className="bg-zinc-950 rounded-lg p-6 space-y-6 border border-zinc-800">
                        <h3 className="text-lg font-semibold text-zinc-100">Quizzes</h3>

                        {module.quizzes.map((quiz, quizIndex) => (
                          <div
                            key={quiz.id}
                            className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 space-y-4"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-zinc-100">Quiz {quizIndex + 1}</h4>
                              {module.quizzes.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteQuiz(module.id, quiz.id)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-950"
                                >
                                  Delete Quiz
                                </Button>
                              )}
                            </div>

                            {/* Quiz Title */}
                            <Field>
                              <FieldLabel className="text-zinc-300 font-medium">
                                Quiz Title
                              </FieldLabel>
                              <Input
                                value={quiz.title}
                                onChange={e =>
                                  updateQuiz(module.id, quiz.id, 'title', e.target.value)
                                }
                                placeholder="e.g., Module 1 Assessment"
                                className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                              />
                            </Field>

                            {/* Questions */}
                            <div className="space-y-4">
                              {quiz.questions.map((question, questionIndex) => (
                                <div
                                  key={questionIndex}
                                  className="bg-zinc-800 rounded-lg p-4 space-y-3"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-zinc-300">
                                      Question {questionIndex + 1}
                                    </span>
                                    {quiz.questions.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          deleteQuestion(module.id, quiz.id, questionIndex)
                                        }
                                        className="text-red-400 hover:text-red-300"
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    )}
                                  </div>

                                  {/* Question Text */}
                                  <Input
                                    value={question.questionText}
                                    onChange={e =>
                                      updateQuestion(
                                        module.id,
                                        quiz.id,
                                        questionIndex,
                                        'questionText',
                                        e.target.value,
                                      )
                                    }
                                    placeholder="What is a variable?"
                                    className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-500"
                                  />

                                  {/* Options */}
                                  <div>
                                    <FieldLabel className="text-zinc-300 font-medium text-sm mb-2">
                                      Options (select correct answer)
                                    </FieldLabel>
                                    <div className="space-y-2">
                                      {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center gap-3">
                                          <input
                                            type="radio"
                                            name={`quiz-${module.id}-${quiz.id}-${questionIndex}`}
                                            checked={question.correctAnswer === optionIndex}
                                            onChange={() =>
                                              updateQuestion(
                                                module.id,
                                                quiz.id,
                                                questionIndex,
                                                'correctAnswer',
                                                optionIndex,
                                              )
                                            }
                                            className="w-4 h-4 text-blue-600 bg-zinc-900 border-zinc-700"
                                          />
                                          <Input
                                            value={option}
                                            onChange={e =>
                                              updateOption(
                                                module.id,
                                                quiz.id,
                                                questionIndex,
                                                optionIndex,
                                                e.target.value,
                                              )
                                            }
                                            placeholder={`Option ${optionIndex + 1}`}
                                            className="flex-1 bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-500"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => addOption(module.id, quiz.id, questionIndex)}
                                      className="mt-2 text-blue-400 hover:text-white hover:bg-blue-600"
                                    >
                                      <Plus className="w-4 h-4 mr-2" />
                                      Add Option
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => addQuestion(module.id, quiz.id)}
                              className="text-blue-400 hover:text-white hover:bg-blue-600"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Question
                            </Button>
                          </div>
                        ))}

                        <Button
                          type="button"
                          size="sm"
                          onClick={() => addQuiz(module.id)}
                          className="text-white bg-blue-500 hover:bg-blue-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Quiz
                        </Button>
                      </div>
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                onClick={addModule}
                className="w-full md:w-auto text-white bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Module
              </Button>
            </div>
          </div>

          {/* Capstone Projects Section */}
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-6">Capstone Projects</h2>
            <div className="space-y-6">
              {capstoneProjects.map((project, projectIndex) => (
                <Card key={project.id} className="border-zinc-800 bg-zinc-900">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-zinc-100">
                      Capstone Project {projectIndex + 1}
                    </CardTitle>
                    {capstoneProjects.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCapstoneProject(project.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-950"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Project
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <FieldGroup>
                      <Field>
                        <FieldLabel className="text-zinc-300 font-medium">Project Title</FieldLabel>
                        <Input
                          value={project.title}
                          onChange={e => updateCapstoneProject(project.id, 'title', e.target.value)}
                          placeholder="e.g., Build a Personal Portfolio Website"
                          className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                        />
                      </Field>

                      <Field>
                        <FieldLabel className="text-zinc-300 font-medium">
                          Project Description
                        </FieldLabel>
                        <InputGroupTextarea
                          value={project.description}
                          onChange={e =>
                            updateCapstoneProject(project.id, 'description', e.target.value)
                          }
                          placeholder="What students will create in this project..."
                          rows={4}
                          className="resize-none bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                        />
                      </Field>

                      {/* Requirements */}
                      <div>
                        <FieldLabel className="text-zinc-300 font-medium mb-3">
                          Requirements
                        </FieldLabel>
                        <div className="space-y-2">
                          {project.requirements.map((req, reqIndex) => (
                            <div key={reqIndex} className="flex items-center gap-3">
                              <Input
                                value={req}
                                onChange={e =>
                                  updateRequirement(project.id, reqIndex, e.target.value)
                                }
                                placeholder="e.g., Use React for frontend"
                                className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                              />
                              {project.requirements.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeRequirement(project.id, reqIndex)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addRequirement(project.id)}
                          className="mt-3 text-blue-400 hover:text-white hover:bg-blue-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Requirement
                        </Button>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <FieldLabel className="text-zinc-300 font-medium mb-3">
                          Deliverables
                        </FieldLabel>
                        <div className="space-y-2">
                          {project.deliverables.map((del, delIndex) => (
                            <div key={delIndex} className="flex items-center gap-3">
                              <Input
                                value={del}
                                onChange={e =>
                                  updateDeliverable(project.id, delIndex, e.target.value)
                                }
                                placeholder="e.g., Deployed website URL"
                                className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                              />
                              {project.deliverables.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeDeliverable(project.id, delIndex)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addDeliverable(project.id)}
                          className="mt-3 text-blue-400 hover:text-white hover:bg-blue-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Deliverable
                        </Button>
                      </div>

                      {/* Is Locked Toggle */}
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`locked-${project.id}`}
                          checked={project.isLocked}
                          onChange={e =>
                            updateCapstoneProject(project.id, 'isLocked', e.target.checked)
                          }
                          className="w-4 h-4 text-blue-600 bg-zinc-900 border-zinc-700 rounded"
                        />
                        <label htmlFor={`locked-${project.id}`} className="text-sm text-zinc-300">
                          Lock this project (students must complete prerequisites)
                        </label>
                      </div>
                    </FieldGroup>
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                onClick={addCapstoneProject}
                className="w-full md:w-auto text-white bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Capstone Project
              </Button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6">
            <Button
              type="button"
              className="bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              form="create-course-form"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Course
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
