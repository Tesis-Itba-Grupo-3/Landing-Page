// ... existing code ...
 className="w-full h-auto transform transition-transform duration-500 group-hover:translate-y-[-10px] group-hover:scale-105"
              style={{ maxWidth: '250px' }} // Add a max-width to prevent excessive scaling
            />
// ... existing code ...
          <div className="relative w-full max-w-xs">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-center">
                <FileSpreadsheet size={48} className="text-blue-600 mb-2" />
                <p className="text-sm font-semibold text-gray-700">Información del viaje</p>
              </div>
// ... existing code ...
              </div>
            </div>
            <div className="flex flex-col items-center mt-8">
              <FileText size={48} className="text-blue-600 mb-2" />
              <p className="text-sm font-semibold text-gray-700">Cotización profesional</p>
            </div>
          </div>
// ... existing code ...
                repeatCount="indefinite"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
