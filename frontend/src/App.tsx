import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, UserPlus, Trophy, LogOut, ChevronRight, CheckCircle2, XCircle, Settings, Trash2, X } from 'lucide-react';
import { QUESTIONS } from './data/constants';
import { storageService } from './services/storageService';

type User = {
  username: string;
  score: number;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [currentStep, setCurrentStep] = useState<'welcome' | 'info' | 'auth' | 'quiz' | 'ranking'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [ranking, setRanking] = useState<User[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isRegistering) {
      const newUser = storageService.register(username, password);
      if (newUser) {
        setUser({ username: newUser.username, score: newUser.score });
        setCurrentStep('quiz');
      } else {
        setError('Usuário já existe.');
      }
    } else {
      const loggedUser = storageService.login(username, password);
      if (loggedUser) {
        setUser({ username: loggedUser.username, score: loggedUser.score });
        setCurrentStep('quiz');
      } else {
        setError('Usuário ou senha incorretos.');
      }
    }
  };

  const handleDeleteAccount = () => {
    if (!user) return;
    if (!confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) return;

    storageService.deleteAccount(user.username);
    alert('Conta excluída com sucesso.');
    logout();
  };

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === QUESTIONS[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 10);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (user) {
      storageService.updateScore(user.username, score);
    }
    fetchRanking();
    setCurrentStep('ranking');
  };

  const fetchRanking = () => {
    const data = storageService.getRanking();
    setRanking(data);
  };

  const logout = () => {
    setUser(null);
    setCurrentStep('welcome');
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUsername('');
    setPassword('');
    setIsSettingsOpen(false);
  };

  const SettingsModal = () => (
    <AnimatePresence>
      {isSettingsOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-senac-blue">Configurações da Conta</h3>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Usuário Atual</p>
                <p className="font-bold text-gray-800">{user?.username}</p>
              </div>
              
              <button 
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-bold border-2 border-red-100 hover:bg-red-100 transition-all"
              >
                <Trash2 size={20} />
                Excluir Minha Conta
              </button>
              
              <p className="text-xs text-gray-400 text-center">
                A exclusão da conta removerá permanentemente seu nome e pontuação do ranking.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-senac-blue relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-senac-orange rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white rounded-full opacity-10 blur-3xl"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center relative z-10 border-b-8 border-senac-orange"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-senac-blue p-6 rounded-full shadow-lg">
              <Trophy className="text-white w-16 h-16" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-black text-senac-blue mb-4">Bem-vindo ao Quiz!</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Teste seus conhecimentos sobre o programa <span className="font-bold text-senac-orange">Jovem Aprendiz</span> e conquiste o topo do ranking!
          </p>
          
          <button 
            onClick={() => setCurrentStep('info')}
            className="group relative w-full bg-senac-orange text-white py-4 rounded-2xl font-bold text-xl hover:bg-opacity-90 transition-all shadow-xl flex items-center justify-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">Começar Agora</span>
            <ChevronRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </motion.div>
      </div>
    );
  }

  if (currentStep === 'info') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl border-l-8 border-senac-blue"
        >
          <h2 className="text-3xl font-bold text-senac-blue mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-senac-orange" size={32} />
            Como funciona o Quiz?
          </h2>
          
          <div className="space-y-6 text-gray-700 mb-8">
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 p-2 rounded-lg text-senac-blue font-bold">01</div>
              <p className="text-lg">Você precisará criar um usuário ou fazer login para salvar sua pontuação.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 p-2 rounded-lg text-senac-blue font-bold">02</div>
              <p className="text-lg">O quiz possui <span className="font-bold text-senac-blue">{QUESTIONS.length} perguntas</span> sobre o programa Jovem Aprendiz.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 p-2 rounded-lg text-senac-blue font-bold">03</div>
              <p className="text-lg">Cada resposta correta vale <span className="font-bold text-senac-orange">10 pontos</span>.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 p-2 rounded-lg text-senac-blue font-bold">04</div>
              <p className="text-lg">Ao final, você verá sua posição no <span className="font-bold text-senac-blue">Ranking Geral</span>.</p>
            </div>
          </div>
          
          <button 
            onClick={() => setCurrentStep('auth')}
            className="w-full bg-senac-blue text-white py-4 rounded-2xl font-bold text-xl hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Entendido, vamos lá!
            <ChevronRight size={24} />
          </button>
        </motion.div>
      </div>
    );
  }

  if (currentStep === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-8 border-senac-orange"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-senac-blue p-4 rounded-full">
              <Trophy className="text-white w-12 h-12" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-senac-blue mb-2">Quiz Jovem Aprendiz</h1>
          <p className="text-center text-gray-500 mb-8">Senac - Transformando Vidas</p>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition-all"
                placeholder="Seu nome de usuário"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition-all"
                placeholder="Sua senha"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-senac-blue text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {isRegistering ? <UserPlus size={20} /> : <LogIn size={20} />}
              {isRegistering ? 'Cadastrar' : 'Entrar'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-senac-orange font-medium hover:underline text-sm"
            >
              {isRegistering ? 'Já tem uma conta? Entre aqui' : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentStep === 'quiz') {
    const q = QUESTIONS[currentQuestionIndex];
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-senac-blue font-bold text-xl">Olá, {user?.username}!</h2>
              <p className="text-gray-500 text-sm">Pergunta {currentQuestionIndex + 1} de {QUESTIONS.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-senac-orange text-white px-4 py-2 rounded-full font-bold shadow-sm">
                Pontos: {score}
              </div>
              <button onClick={() => setIsSettingsOpen(true)} className="p-2 text-gray-400 hover:text-senac-blue transition-colors">
                <Settings size={20} />
              </button>
              <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          </header>

          <SettingsModal />

          <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
              className="bg-senac-blue h-full"
            />
          </div>

          <motion.div 
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-8 leading-relaxed">
              {q.text}
            </h3>

            <div className="space-y-4">
              {q.options.map((option, idx) => {
                const isCorrect = option === q.correctAnswer;
                const isSelected = selectedOption === option;
                
                let bgColor = 'bg-white';
                let borderColor = 'border-gray-200';
                let textColor = 'text-gray-700';

                if (isAnswered) {
                  if (isCorrect) {
                    bgColor = 'bg-green-50';
                    borderColor = 'border-green-500';
                    textColor = 'text-green-700';
                  } else if (isSelected) {
                    bgColor = 'bg-red-50';
                    borderColor = 'border-red-500';
                    textColor = 'text-red-700';
                  }
                } else if (isSelected) {
                  borderColor = 'border-senac-blue';
                  bgColor = 'bg-blue-50';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${bgColor} ${borderColor} ${textColor} ${!isAnswered && 'hover:border-senac-blue hover:bg-blue-50'}`}
                  >
                    <span className="font-medium">{option}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="text-green-500" size={20} />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500" size={20} />}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {isAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex justify-end"
                >
                  <button 
                    onClick={nextQuestion}
                    className="bg-senac-orange text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md"
                  >
                    {currentQuestionIndex === QUESTIONS.length - 1 ? 'Finalizar' : 'Próxima'}
                    <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  if (currentStep === 'ranking') {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <SettingsModal />
            <div className="bg-senac-blue p-12 text-center text-white relative">
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => setIsSettingsOpen(true)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <Settings size={20} />
                </button>
                <button onClick={logout} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
              <Trophy className="w-20 h-20 mx-auto mb-4 text-senac-orange" />
              <h1 className="text-3xl font-bold mb-2">Ranking Final</h1>
              <p className="text-blue-100">Parabéns a todos os participantes!</p>
              
              <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 inline-block">
                <p className="text-sm uppercase tracking-widest mb-1 opacity-80">Sua Pontuação</p>
                <p className="text-4xl font-black text-senac-orange">{score}</p>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Trophy size={18} className="text-senac-orange" />
                Top 10 Aprendizes
              </h3>
              
              <div className="space-y-3">
                {ranking.map((r, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className={`flex items-center justify-between p-4 rounded-xl ${r.username === user?.username ? 'bg-orange-50 border-2 border-senac-orange' : 'bg-gray-50 border border-gray-100'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${idx === 0 ? 'bg-yellow-400 text-white' : idx === 1 ? 'bg-gray-300 text-white' : idx === 2 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-gray-700">{r.username}</span>
                    </div>
                    <span className="font-black text-senac-blue">{r.score} pts</span>
                  </motion.div>
                ))}
              </div>

              <button 
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setSelectedOption(null);
                  setIsAnswered(false);
                  setCurrentStep('quiz');
                }}
                className="w-full mt-8 bg-senac-blue text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg"
              >
                Tentar Novamente
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
