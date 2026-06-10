'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { X, Loader2, Package, Building2, ChevronDown, AlertCircle } from 'lucide-react';
import { Product, CreateProductDto, UpdateProductDto } from '@/types/product';
import { Business } from '@/types/business';
import { businessService  } from '@/services/business';

interface ProductFormModalProps {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
  onCreate: (dto: CreateProductDto) => Promise<Product>;
  onUpdate: (id: string, dto: UpdateProductDto) => Promise<Product>;
}

interface FormValues {
  name: string;
  sku: string;
  description: string;
  price: string;
  taxRate: string;
  businessId: string;
}

interface FormErrors {
  name?: string;
  price?: string;
  taxRate?: string;
  businessId?: string;
}

const INITIAL_VALUES: FormValues = {
  name: '',
  sku: '',
  description: '',
  price: '',
  taxRate: '0',
  businessId: '',
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'El nombre es obligatorio';
  if (!values.businessId) errors.businessId = 'Seleccioná un negocio';
  if (!values.price || isNaN(Number(values.price)) || Number(values.price) < 0)
    errors.price = 'Ingresá un precio válido';
  if (isNaN(Number(values.taxRate)) || Number(values.taxRate) < 0 || Number(values.taxRate) > 100)
    errors.taxRate = 'El IVA debe estar entre 0 y 100';
  return errors;
}

export function ProductFormModal({
  open,
  product,
  onClose,
  onCreate,
  onUpdate,
}: ProductFormModalProps) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Businesses
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [businessesLoading, setBusinessesLoading] = useState(false);
  const [businessesError, setBusinessesError] = useState<string | null>(null);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!product;

  // ─── Cargar negocios ────────────────────────────────────────────────────────

  const fetchBusinesses = useCallback(async () => {
    setBusinessesLoading(true);
    setBusinessesError(null);
    try {
      const getData = await businessService.getAll();

      const getBusinesses = getData as unknown as { data: Business[] }; // Ajusta esto según la estructura real de tu respuesta
         
      setBusinesses(getBusinesses.data);
    } catch (err) {
      setBusinessesError('No se pudieron cargar los negocios');
    } finally {
      setBusinessesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) fetchBusinesses();
  }, [open, fetchBusinesses]);

  // ─── Poblar form al editar ──────────────────────────────────────────────────

  useEffect(() => {
    if (product) {
      setValues({
        name: product.name,
        sku: product.sku ?? '',
        description: product.description ?? '',
        price: product.price.toString(),
        taxRate: product.taxRate.toString(),
        businessId: product.businessId,
      });
    } else {
      setValues(INITIAL_VALUES);
    }
    setErrors({});
    setSubmitError(null);
  }, [product, open]);

  // Focus primer input
  useEffect(() => {
    if (open) setTimeout(() => firstInputRef.current?.focus(), 50);
  }, [open]);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !submitting) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, submitting]);

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleChange =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const dto: CreateProductDto = {
      name: values.name.trim(),
      sku: values.sku.trim() || undefined,
      description: values.description.trim() || undefined,
      price: Number(values.price),
      taxRate: Number(values.taxRate),
      businessId: values.businessId,
    };

    try {
      if (isEdit && product) {
        await onUpdate(product.id, dto);
      } else {
        await onCreate(dto);
      }
      onClose();
    } catch (err) {
      setSubmitError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  // Negocio seleccionado actualmente (para mostrar en el select cuando está editando)
  const selectedBusiness = businesses.find((b) => b.id === values.businessId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => !submitting && onClose()}
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800">
              <Package className="h-4 w-4 text-zinc-400" strokeWidth={1.5} />
            </div>
            <div>
              <h2 id="modal-title" className="text-sm font-semibold text-zinc-100">
                {isEdit ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              {isEdit && <p className="text-xs text-zinc-500">{product?.name}</p>}
            </div>
          </div>
          <button
            onClick={() => !submitting && onClose()}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
            disabled={submitting}
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="space-y-4 px-6 py-5">

              {/* ── Negocio ── */}
              <Field label="Negocio" required error={errors.businessId}>
                {businessesError ? (
                  <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2">
                    <div className="flex items-center gap-2 text-xs text-red-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                      {businessesError}
                    </div>
                    <button
                      type="button"
                      onClick={fetchBusinesses}
                      className="text-xs text-red-400 underline hover:text-red-300"
                    >
                      Reintentar
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                      {businessesLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-zinc-600" strokeWidth={1.5} />
                      ) : (
                        <Building2 className="h-4 w-4 text-zinc-500" strokeWidth={1.5} />
                      )}
                    </div>
                    <select
                      value={values.businessId}
                      onChange={handleChange('businessId')}
                      disabled={submitting || businessesLoading}
                      className={`${selectClass(!!errors.businessId)} pl-9 pr-9`}
                    >
                      <option value="" disabled>
                        {businessesLoading ? 'Cargando negocios…' : 'Seleccioná un negocio'}
                      </option>
                      {businesses.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                      strokeWidth={1.5}
                    />
                  </div>
                )}

                {/* Badge del negocio seleccionado */}
                {selectedBusiness && !errors.businessId && (
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs text-zinc-500">
                      Negocio seleccionado:{' '}
                      <span className="font-medium text-zinc-300">{selectedBusiness.name}</span>
                    </span>
                  </div>
                )}
              </Field>

              {/* Divider */}
              <div className="h-px bg-zinc-800/60" />

              {/* ── Nombre ── */}
              <Field label="Nombre" required error={errors.name}>
                <input
                  ref={firstInputRef}
                  type="text"
                  value={values.name}
                  onChange={handleChange('name')}
                  placeholder="Ej: Remera básica negra"
                  className={inputClass(!!errors.name)}
                  disabled={submitting}
                />
              </Field>

              {/* ── SKU ── */}
              <Field label="SKU / Código de barras">
                <input
                  type="text"
                  value={values.sku}
                  onChange={handleChange('sku')}
                  placeholder="Ej: REM-NEG-M"
                  className={inputClass(false)}
                  disabled={submitting}
                />
              </Field>

              {/* ── Descripción ── */}
              <Field label="Descripción">
                <textarea
                  value={values.description}
                  onChange={handleChange('description')}
                  placeholder="Descripción opcional del producto…"
                  rows={3}
                  className={`${inputClass(false)} resize-none`}
                  disabled={submitting}
                />
              </Field>

              {/* ── Precio + IVA ── */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Precio (ARS)" required error={errors.price}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={values.price}
                      onChange={handleChange('price')}
                      placeholder="0"
                      className={`${inputClass(!!errors.price)} pl-7`}
                      disabled={submitting}
                    />
                  </div>
                </Field>

                <Field label="IVA (%)" error={errors.taxRate}>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.5"
                      value={values.taxRate}
                      onChange={handleChange('taxRate')}
                      placeholder="0"
                      className={`${inputClass(!!errors.taxRate)} pr-7`}
                      disabled={submitting}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                      %
                    </span>
                  </div>
                </Field>
              </div>

              {/* ── Error general ── */}
              {submitError && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  {submitError}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-zinc-800 px-6 py-4">
            <button
              type="button"
              onClick={() => !submitting && onClose()}
              disabled={submitting}
              className="rounded-lg border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting || businessesLoading}
              className="flex items-center gap-2 rounded-lg bg-white px-5 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {isEdit ? 'Guardar cambios' : 'Crear producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-400">
        {label}
        {required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  `h-10 w-full rounded-lg border ${
    hasError ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-zinc-600'
  } bg-zinc-900 px-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 ${
    hasError ? 'focus:ring-red-500/30' : 'focus:ring-zinc-600/30'
  } transition-colors`;

const selectClass = (hasError: boolean) =>
  `h-10 w-full appearance-none rounded-lg border ${
    hasError ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-zinc-600'
  } bg-zinc-900 text-sm text-zinc-100 focus:outline-none focus:ring-1 ${
    hasError ? 'focus:ring-red-500/30' : 'focus:ring-zinc-600/30'
  } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`;