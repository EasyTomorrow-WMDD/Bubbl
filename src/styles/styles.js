import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    padding: 20,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#475569',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sentenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 60,
  },
  sentenceText: {
    fontSize: 24,
    lineHeight: 40,
    color: '#334155',
    textAlign: 'center',
  },
  blank: {
    borderWidth: 2,
    borderColor: '#94a3b8',
    borderStyle: 'dashed',
    width: 120,
    height: 50,
    borderRadius: 10,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  droppableActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#dbeafe',
  },
  droppedCorrect: {
    borderColor: '#16a34a',
    backgroundColor: '#dcfce7',
  },
  wordOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  wordContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    margin: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  wordText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1e293b',
  },
  hidden: {
    opacity: 0,
  },
  nextButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    margin: 20,
    alignItems: 'center',
    elevation: 3,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  finalScoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  finalScore: {
    fontSize: 24,
    color: '#475569',
    marginBottom: 40,
  },
  restartButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
});
