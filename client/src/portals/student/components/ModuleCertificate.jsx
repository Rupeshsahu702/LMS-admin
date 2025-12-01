// CustomCertificate.jsx
import React from 'react';
import { Mail, Globe, FileText, Building2, MapPin, Award, Shield } from 'lucide-react';

import signature from '../../../assets/images/signature.png';

const CustomCertificate = ({
  // Student/Certificate Data - DYNAMIC
  studentName = 'John Doe',
  course = 'Full Stack Development',
  timeperiod = '3 months',
  conductedFrom = '1st August - 31st October, 2025',
  certificateId = 'C2D-2025-001234',

  // Company Data
  ceoName = 'PRAVIN R. NAIR',
  ceoTitle = 'Chief Executive Officer',
  email = 'pravinrnair@nairsolutions.org',
  website = 'www.code2dbug.com',
  regNo = 'UDYAM-CG-05-0062143',
  gstin = '22DMOPP2753L',
  address = 'Shop No - 17, Govind 8D LIG, G.T. Road, Bhilai, Durg, Chhattisgarh',
}) => {
  return (
    <div className="relative w-full min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      {/* Certificate Container */}
      <div className="relative w-[900px] bg-white shadow-2xl overflow-hidden">
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-32 h-32">
          <div className="absolute top-4 left-4 w-24 h-24 border-l-4 border-t-4 border-amber-500"></div>
          <div className="absolute top-6 left-6 w-20 h-20 border-l-2 border-t-2 border-amber-300"></div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32">
          <div className="absolute top-4 right-4 w-24 h-24 border-r-4 border-t-4 border-amber-500"></div>
          <div className="absolute top-6 right-6 w-20 h-20 border-r-2 border-t-2 border-amber-300"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-32 h-32">
          <div className="absolute bottom-4 left-4 w-24 h-24 border-l-4 border-b-4 border-amber-500"></div>
          <div className="absolute bottom-6 left-6 w-20 h-20 border-l-2 border-b-2 border-amber-300"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32">
          <div className="absolute bottom-4 right-4 w-24 h-24 border-r-4 border-b-4 border-amber-500"></div>
          <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-amber-300"></div>
        </div>

        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Main Content */}
        <div className="relative px-16 py-12">
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Logo & Company Name */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-lg">
                  <span
                    className="text-2xl font-bold text-amber-400"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    NS
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-500 font-medium tracking-[0.3em] uppercase">
                  N.A.I.R. Solutions
                </p>
                <p className="text-lg font-bold text-slate-800 tracking-wide">CODE2DBUG</p>
              </div>
            </div>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-24 bg-linear-to-r from-transparent via-amber-400 to-amber-500"></div>
              <Award className="w-8 h-8 text-amber-500" />
              <div className="h-px w-24 bg-linear-to-l from-transparent via-amber-400 to-amber-500"></div>
            </div>

            {/* Main Title */}
            <h1
              className="text-5xl font-light text-slate-800 tracking-[0.2em] mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              CERTIFICATE
            </h1>
            <p className="text-lg text-slate-600 tracking-[0.4em] font-light uppercase">
              of Achievement
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-slate-300"></div>
            <div className="w-2 h-2 rotate-45 bg-amber-500"></div>
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-slate-300"></div>
          </div>

          {/* Certificate Body */}
          <div className="text-center mb-10">
            <p className="text-sm text-slate-500 uppercase tracking-[0.25em] mb-4">
              This certificate is proudly presented to
            </p>

            {/* Student Name */}
            <div className="relative inline-block mb-6">
              <h2
                className="text-5xl text-slate-800 font-light py-2 px-8"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {studentName}
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-500 to-transparent"></div>
            </div>

            {/* Achievement Description */}
            <p className="text-base text-slate-600 leading-relaxed max-w-[600px] mx-auto mb-6">
              In recognition of outstanding dedication and successful completion of the
            </p>

            {/* Course Name */}
            <div className="inline-block bg-linear-to-r from-slate-800 to-slate-900 text-white px-8 py-3 rounded-sm mb-6">
              <span className="text-lg font-semibold tracking-wide">{course}</span>
            </div>

            <p className="text-base text-slate-600 leading-relaxed max-w-[600px] mx-auto">
              <span className="font-semibold text-slate-700">{timeperiod}</span> Internship Program
            </p>

            {/* Duration */}
            <div className="mt-6 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-6 py-2">
              <span className="text-sm text-amber-700 font-medium">{conductedFrom}</span>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex justify-between items-end mt-12 pt-8 border-t border-slate-200">
            {/* Company Details */}
            <div className="max-w-[280px]">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-8 h-px bg-amber-500"></div>
                Official Verification
              </h4>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-amber-600" />
                  <span>{website}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Reg: {regNo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>GSTIN: {gstin}</span>
                </div>
                <div className="flex items-start gap-2 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <span className="text-[10px] leading-tight">{address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Bottom Ribbon */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-amber-400 via-amber-500 to-amber-400"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomCertificate;
