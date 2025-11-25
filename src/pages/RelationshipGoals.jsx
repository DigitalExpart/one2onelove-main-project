
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, Target, TrendingUp, CheckCircle2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/Layout";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import goalsService from "@/lib/goalsService";

import GoalForm from "../components/goals/GoalForm";
import GoalCard from "../components/goals/GoalCard";
import ProgressUpdateModal from "../components/goals/ProgressUpdateModal";

const translations = {
  en: {
    title: "Relationship Goals",
    subtitle: "Set meaningful goals together and track your journey to a stronger relationship",
    addGoal: "Add New Goal",
    activeGoals: "Active Goals",
    completedGoals: "Completed Goals",
    noActiveGoals: "No Active Goals",
    noActiveGoalsDesc: "Start setting goals to strengthen your relationship!",
    noCompletedGoals: "No Completed Goals Yet",
    noCompletedGoalsDesc: "Keep working on your goals - you'll see them here when completed!",
    goalAdded: "Goal added successfully! 💕",
    goalUpdated: "Goal updated successfully! ✨",
    goalDeleted: "Goal deleted",
    backToSupport: "Back to Support",
    stats: {
      totalGoals: "Total Goals",
      completed: "Completed",
      avgProgress: "Avg Progress"
    }
  },
  es: {
    title: "Metas de Relación",
    subtitle: "Establezcan metas significativas juntos y sigan su viaje hacia una relación más fuerte",
    addGoal: "Agregar Nueva Meta",
    activeGoals: "Metas Activas",
    completedGoals: "Metas Completadas",
    noActiveGoals: "Sin Metas Activas",
    noActiveGoalsDesc: "¡Comienza a establecer metas para fortalecer tu relación!",
    noCompletedGoals: "Sin Metas Completadas Aún",
    noCompletedGoalsDesc: "¡Sigue trabajando en tus metas - las verás aquí cuando estén completadas!",
    goalAdded: "¡Meta agregada exitosamente! 💕",
    goalUpdated: "¡Meta actualizada exitosamente! ✨",
    goalDeleted: "Meta eliminada",
    backToSupport: "Volver al Soporte",
    stats: {
      totalGoals: "Metas Totales",
      completed: "Completadas",
      avgProgress: "Progreso Prom"
    }
  },
  fr: {
    title: "Objectifs de Relation",
    subtitle: "Fixez des objectifs significatifs ensemble et suivez votre parcours vers une relation plus forte",
    addGoal: "Ajouter Nouvel Objectif",
    activeGoals: "Objectifs Actifs",
    completedGoals: "Objectifs Terminés",
    noActiveGoals: "Pas d'Objectifs Actifs",
    noActiveGoalsDesc: "Commencez à fixer des objectifs pour renforcer votre relation!",
    noCompletedGoals: "Pas d'Objectifs Terminés Encore",
    noCompletedGoalsDesc: "Continuez à travailler sur vos objectifs - vous les verrez ici une fois terminés!",
    goalAdded: "Objectif ajouté avec succès! 💕",
    goalUpdated: "Objectif mis à jour avec succès! ✨",
    goalDeleted: "Objectif supprimé",
    backToSupport: "Retour au Support",
    stats: {
      totalGoals: "Objectifs Totaux",
      completed: "Terminés",
      avgProgress: "Progrès Moyen"
    }
  },
  it: {
    title: "Obiettivi di Relazione",
    subtitle: "Stabilite obiettivi significativi insieme e seguite il vostro percorso verso una relazione più forte",
    addGoal: "Aggiungi Nuovo Obiettivo",
    activeGoals: "Obiettivi Attivi",
    completedGoals: "Obiettivi Completati",
    noActiveGoals: "Nessun Obiettivo Attivo",
    noActiveGoalsDesc: "Inizia a stabilire obiettivi per rafforzare la tua relazione!",
    noCompletedGoals: "Nessun Obiettivo Completato Ancora",
    noCompletedGoalsDesc: "Continua a lavorare sui tuoi obiettivi - li vedrai qui quando completati!",
    goalAdded: "Obiettivo aggiunto con successo! 💕",
    goalUpdated: "Obiettivo aggiornato con successo! ✨",
    goalDeleted: "Obiettivo eliminato",
    backToSupport: "Torna al Supporto",
    stats: {
      totalGoals: "Obiettivi Totali",
      completed: "Completati",
      avgProgress: "Progresso Medio"
    }
  },
  de: {
    title: "Beziehungsziele",
    subtitle: "Setzen Sie gemeinsam bedeutungsvolle Ziele und verfolgen Sie Ihre Reise zu einer stärkeren Beziehung",
    addGoal: "Neues Ziel Hinzufügen",
    activeGoals: "Aktive Ziele",
    completedGoals: "Abgeschlossene Ziele",
    noActiveGoals: "Keine Aktiven Ziele",
    noActiveGoalsDesc: "Beginnen Sie Ziele zu setzen, um Ihre Beziehung zu stärken!",
    noCompletedGoals: "Noch Keine Abgeschlossenen Ziele",
    noCompletedGoalsDesc: "Arbeiten Sie weiter an Ihren Zielen - Sie werden sie hier sehen, wenn sie abgeschlossen sind!",
    goalAdded: "Ziel erfolgreich hinzugefügt! 💕",
    goalUpdated: "Ziel erfolgreich aktualisiert! ✨",
    goalDeleted: "Ziel gelöscht",
    backToSupport: "Zurück zum Support",
    stats: {
      totalGoals: "Ziele Gesamt",
      completed: "Abgeschlossen",
      avgProgress: "Durchschn. Fortschritt"
    }
  }
};

export default function RelationshipGoals() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [updatingGoal, setUpdatingGoal] = useState(null);

  const { data: goals = [], isLoading } = useQuery({
    queryKey: ['relationship-goals'],
    queryFn: () => goalsService.getGoals('-created_at'),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (data) => goalsService.createGoal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationship-goals'] });
      setShowForm(false);
      setEditingGoal(null);
      toast.success(t.goalAdded);
    },
    onError: (error) => {
      toast.error('Failed to create goal: ' + error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => goalsService.updateGoal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationship-goals'] });
      setShowForm(false);
      setEditingGoal(null);
      setUpdatingGoal(null);
      toast.success(t.goalUpdated);
    },
    onError: (error) => {
      toast.error('Failed to update goal: ' + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => goalsService.deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationship-goals'] });
      toast.success(t.goalDeleted);
    },
    onError: (error) => {
      toast.error('Failed to delete goal: ' + error.message);
    }
  });

  const handleSubmit = (data) => {
    if (editingGoal) {
      updateMutation.mutate({ id: editingGoal.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleUpdateProgress = (goalData) => {
    updateMutation.mutate({ id: updatingGoal.id, data: goalData });
  };

  const activeGoals = goals.filter(g => g.status !== 'completed');
  const completedGoals = goals.filter(g => g.status === 'completed');

  const stats = {
    total: goals.length,
    completed: completedGoals.length,
    avgProgress: goals.length > 0 ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length) : 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link
            to={createPageUrl("CoupleSupport")}
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
          >
            <ArrowLeft size={20} className="mr-2" />
            {t.backToSupport}
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-dancing">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {t.subtitle}
          </p>
          <Button
            onClick={() => {
              setEditingGoal(null);
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            {t.addGoal}
          </Button>
        </motion.div>

        {/* Stats */}
        {goals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600">{t.stats.totalGoals}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.completed}</div>
              <div className="text-sm text-gray-600">{t.stats.completed}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.avgProgress}%</div>
              <div className="text-sm text-gray-600">{t.stats.avgProgress}</div>
            </motion.div>
          </div>
        )}

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-pink-600" />
              {t.activeGoals}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onUpdateProgress={setUpdatingGoal}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              {t.completedGoals}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onUpdateProgress={setUpdatingGoal}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {goals.length === 0 && !showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Target className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-600 mb-3">{t.noActiveGoals}</h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              {t.noActiveGoalsDesc}
            </p>
          </motion.div>
        )}

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <GoalForm
              goal={editingGoal}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingGoal(null);
              }}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          )}
        </AnimatePresence>

        {/* Progress Update Modal */}
        <AnimatePresence>
          {updatingGoal && (
            <ProgressUpdateModal
              goal={updatingGoal}
              onUpdate={handleUpdateProgress}
              onCancel={() => setUpdatingGoal(null)}
              isLoading={updateMutation.isPending}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
