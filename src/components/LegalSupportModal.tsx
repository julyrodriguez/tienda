import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Scale,
  ShieldCheck,
  FileText,
  RotateCcw,
  ExternalLink,
  CheckCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const LegalSupportModal: React.FC = () => {
  const { isLegalModalOpen, setIsLegalModalOpen, legalTab, setLegalTab, addToast } = useStore();

  // Arrepentimiento form state
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [regretSuccessCode, setRegretSuccessCode] = useState<string | null>(null);

  if (!isLegalModalOpen) return null;

  const handleRegretSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) return;

    const code = `ARR-${Math.floor(100000 + Math.random() * 900000)}`;
    setRegretSuccessCode(code);
    addToast({
      type: 'success',
      title: 'Solicitud de arrepentimiento registrada',
      description: `Comprobante #${code}. Nos contactaremos en menos de 24h.`,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsLegalModalOpen(false)}
          className="fixed inset-0 bg-[#1C1917]/50"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.22 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-2xl overflow-hidden text-[#1C1917] gpu-layer"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#E8E1D5] flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-[#EADBC8] text-[#78350F] border border-[#DEC9AE]">
                <Scale className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="font-display font-black text-lg sm:text-2xl text-[#1C1917]">
                  Marco Legal & Protección al Consumidor
                </h2>
                <p className="text-[11px] sm:text-xs text-[#78716C]">
                  Conformidad legal según Ley 24.240, Ley 25.326 y Res. 424/2020 de la República Argentina.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsLegalModalOpen(false)}
              className="p-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F4ECE0] text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer border border-[#E8E1D5]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#E8E1D5] bg-[#FFFFFF] overflow-x-auto scrollbar-none px-4 pt-2 gap-1 sm:gap-2">
            <button
              onClick={() => { setLegalTab('terms'); setRegretSuccessCode(null); }}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                legalTab === 'terms'
                  ? 'border-[#C25E38] text-[#1C1917]'
                  : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <FileText className="w-4 h-4 text-[#C25E38]" />
              <span>Términos y Condiciones</span>
            </button>

            <button
              onClick={() => { setLegalTab('privacy'); setRegretSuccessCode(null); }}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                legalTab === 'privacy'
                  ? 'border-[#C25E38] text-[#1C1917]'
                  : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
              <span>Políticas de Privacidad</span>
            </button>

            <button
              onClick={() => { setLegalTab('consumer'); setRegretSuccessCode(null); }}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                legalTab === 'consumer'
                  ? 'border-[#C25E38] text-[#1C1917]'
                  : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Scale className="w-4 h-4 text-[#78350F]" />
              <span>Defensa del Consumidor</span>
            </button>

            <button
              onClick={() => { setLegalTab('regret'); }}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                legalTab === 'regret'
                  ? 'border-[#C25E38] text-[#C25E38]'
                  : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <RotateCcw className="w-4 h-4 text-[#C25E38]" />
              <span className="font-extrabold">Botón de Arrepentimiento</span>
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm text-[#57534E] leading-relaxed">
            
            {/* TAB 1: Términos y Condiciones */}
            {legalTab === 'terms' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5]">
                  <h3 className="font-bold text-[#1C1917] text-sm sm:text-base mb-1">
                    1. Aspectos Generales y Ámbito de Aplicación
                  </h3>
                  <p>
                    El presente contrato regula los términos y condiciones bajo los cuales los usuarios adquieren productos de tecnología y diseño a través de la plataforma AURA™ STUDIO. El acceso y uso de este sitio implica la aceptación plena e incondicional de estas pautas contractuales.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-[#1C1917]">2. Precios, Facturación y Medios de Pago</h4>
                  <p>
                    Todos los precios publicados en la plataforma están expresados en Pesos Argentinos (ARS) e incluyen el Impuesto al Valor Agregado (IVA), salvo indicación expresa de moneda extranjera (USD). Los pagos son procesados de forma segura mediante plataformas de pago autorizadas por el BCRA (Mercado Pago, tarjetas Visa, Mastercard, transferencia bancaria).
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-[#1C1917]">3. Envíos, Plazos de Entrega y Riesgo</h4>
                  <p>
                    Los envíos son despachados en un plazo máximo de 24 horas hábiles posteriores a la acreditación del pago. Los tiempos de tránsito estimados varían entre 24 y 72 horas hábiles según la localidad de destino. Cada compra incluye un código de seguimiento logístico para su monitoreo en tiempo real.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-[#1C1917]">4. Garantía Legal de los Bienes</h4>
                  <p>
                    En virtud del artículo 11 de la Ley 24.240 de Defensa del Consumidor, todos los productos nuevos gozan de una garantía legal mínima de seis (6) meses. En AURA™ extendemos voluntariamente una garantía oficial de fábrica de hasta dos (2) años sobre componentes mecánicos y electrónicos.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: Políticas de Privacidad */}
            {legalTab === 'privacy' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5]">
                  <h3 className="font-bold text-[#1C1917] text-sm sm:text-base mb-1">
                    Tratamiento de Datos Personales (Ley Nacional N° 25.326)
                  </h3>
                  <p>
                    AURA™ STUDIO adopta todas las medidas técnicas y organizativas para garantizar la confidencialidad y seguridad de los datos personales suministrados por los clientes conforme a la Ley de Protección de Datos Personales.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-[#1C1917]">Finalidad de la Recolección</h4>
                  <p>
                    Los datos recabados (nombre, DNI, dirección de entrega, correo electrónico y teléfono) se emplean exclusivamente para procesar compras, emitir la factura legal correspondiente, coordinar la entrega y brindar soporte posventa.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-[#1C1917]">Derechos de los Titulares (Habeas Data)</h4>
                  <p>
                    El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, así como solicitar su rectificación, actualización o supresión comunicándose a nuestro correo legal.
                  </p>
                  <p className="text-[11px] text-[#78716C] italic">
                    "La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales."
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: Defensa del Consumidor */}
            {legalTab === 'consumer' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-2">
                  <div className="flex items-center gap-2 text-[#78350F] font-bold text-sm">
                    <Scale className="w-5 h-5 text-[#C25E38]" />
                    <span>Dirección Nacional de Defensa del Consumidor</span>
                  </div>
                  <p>
                    En cumplimiento de la legislación nacional y de las Resoluciones de la Secretaría de Comercio Interior de la Nación, brindamos acceso directo a los organismos oficiales de protección al usuario.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs space-y-1.5">
                    <p className="font-bold text-[#1C1917]">Ventanilla Única Federal</p>
                    <p className="text-[11px] text-[#78716C]">
                      Podés iniciar reclamos o consultas formales ante el Servicio de Conciliación Previa en las Relaciones de Consumo (COPREC).
                    </p>
                    <a
                      href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C25E38] hover:underline pt-1"
                    >
                      <span>Formulario de Reclamos</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] shadow-xs space-y-1.5">
                    <p className="font-bold text-[#1C1917]">Línea Gratuita de Asistencia</p>
                    <p className="text-[11px] text-[#78716C]">
                      Asesoramiento gratuito del Gobierno Nacional para consumidores y usuarios.
                    </p>
                    <p className="font-mono font-bold text-sm text-[#0F766E]">
                      📞 0800-666-1518
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E8E1D5] text-[11px] text-[#78716C]">
                  <p>
                    Horario de atención oficial: Lunes a viernes de 09:00 a 18:00 hs. Correo electrónico institucional: <span className="font-semibold text-[#1C1917]">consultas@consumidor.gob.ar</span>
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: Botón de Arrepentimiento */}
            {legalTab === 'regret' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#F4ECE0] border border-[#DEC9AE] space-y-2">
                  <div className="flex items-center gap-2 text-[#78350F] font-bold text-sm sm:text-base">
                    <AlertCircle className="w-5 h-5 text-[#C25E38]" />
                    <span>Derecho de Revocación de Compra (Res. 424/2020)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#57534E]">
                    De acuerdo con el artículo 34 de la Ley 24.240 y la Resolución 424/2020 de la Secretaría de Comercio Interior, tenés derecho a revocar la aceptación del contrato de compra dentro del plazo de <strong>10 (diez) días corridos</strong> contados a partir de la entrega del producto o de la contratación del servicio, sin costo ni penalidad alguna.
                  </p>
                </div>

                {regretSuccessCode ? (
                  <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-extrabold text-lg text-[#1C1917]">
                      ¡Solicitud de Arrepentimiento Registrada!
                    </h4>
                    <p className="text-xs text-[#57534E] max-w-md mx-auto">
                      Tu número identificador reglamentario de trámite es:
                    </p>
                    <div className="inline-block px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#DEC9AE] font-mono font-black text-lg text-[#78350F]">
                      {regretSuccessCode}
                    </div>
                    <p className="text-[11px] text-[#78716C] max-w-md mx-auto">
                      Te enviamos una copia a tu casilla de correo electrónico. Nuestro equipo de logística se pondrá en contacto contigo en un plazo menor a 24 horas para coordinar el retiro del producto sin ningún costo para vos.
                    </p>
                    <button
                      onClick={() => { setRegretSuccessCode(null); setIsLegalModalOpen(false); }}
                      className="px-5 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF7F2] font-bold text-xs cursor-pointer shadow-md"
                    >
                      Cerrar y Volver a la Tienda
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegretSubmit} className="space-y-3 bg-[#FAF7F2] p-4 sm:p-6 rounded-2xl border border-[#E8E1D5]">
                    <h4 className="font-bold text-[#1C1917] text-xs sm:text-sm">
                      Formulario de Solicitud de Devolución Inmediata
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#1C1917] mb-1">
                          Número de Pedido / Orden *
                        </label>
                        <input
                          type="text"
                          required
                          value={orderNumber}
                          onChange={(e) => setOrderNumber(e.target.value)}
                          placeholder="Ej: AUR-582910"
                          className="w-full bg-[#FFFFFF] border border-[#E8E1D5] rounded-xl px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#1C1917] mb-1">
                          Correo Electrónico de la Compra *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="juan@ejemplo.com"
                          className="w-full bg-[#FFFFFF] border border-[#E8E1D5] rounded-xl px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#1C1917] mb-1">
                        Motivo o Comentario (Opcional)
                      </label>
                      <textarea
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Contanos brevemente el motivo para ayudarnos a mejorar..."
                        className="w-full bg-[#FFFFFF] border border-[#E8E1D5] rounded-xl px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#BA9971]"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <p className="text-[10px] sm:text-[11px] text-[#78716C] max-w-sm">
                        Al enviar, se genera un código de trámite obligatorio y se congela el plazo de cobro.
                      </p>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#C25E38] hover:bg-[#B05330] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        Enviar Solicitud
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="p-3.5 sm:p-4 border-t border-[#E8E1D5] bg-[#FAF7F2] flex items-center justify-between text-[11px] text-[#78716C]">
            <span>AURA™ STUDIO S.R.L. • CUIT: 30-71829340-9</span>
            <button
              onClick={() => setIsLegalModalOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E8E1D5] text-[#1C1917] font-bold hover:bg-[#F4ECE0] transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
