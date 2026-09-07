'use client';

import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader';
import { FAQS_DATA } from '@/data/faqs';
import styles from './FAQ.module.css';

const CATEGORIES = ['All', 'General', 'Institutions', 'Coaches', 'Clinical & Safety', 'Curriculum'];

export const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-4': true,
    'faq-7': true,
  });

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = activeCategory === 'All'
    ? FAQS_DATA
    : FAQS_DATA.filter((f) => f.category === activeCategory);

  return (
    <section className={`sectionPadding ${styles.faqSection}`} id="faq">
      <div className="container">
        {/* Section Header */}
        <SectionHeader
          badge="Frequently Asked Questions"
          badgeVariant="primary"
          title="Clear Answers About WTF University"
          subtitle="Everything you need to know about our technology, coaching scopes, clinical governance, and institutional partnership workflows."
          align="center"
        />

        {/* Category Pills */}
        <div className={styles.categoryPills}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.catBtn} ${activeCategory === cat ? styles.catBtnActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className={styles.accordionContainer}>
          {filteredFaqs.map((faq) => {
            const isOpen = Boolean(openIds[faq.id]);

            return (
              <div
                key={faq.id}
                className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ''}`}
              >
                <button
                  className={styles.questionBtn}
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-ans-${faq.id}`}
                >
                  <div className={styles.questionLeft}>
                    <QuestionAnswerOutlinedIcon className={styles.qIcon} />
                    <span className={styles.questionText}>{faq.question}</span>
                  </div>
                  <div className={`${styles.expandIcon} ${isOpen ? styles.expandIconRotated : ''}`}>
                    <ExpandMoreIcon />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-ans-${faq.id}`}
                    className={styles.answerBox}
                    role="region"
                  >
                    <p className={styles.answerText}>{faq.answer}</p>
                    <span className={styles.answerCategory}>Topic: {faq.category}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className={styles.supportCallout}>
          <span>Have an institutional or clinical question not answered here?</span>
          <a href="mailto:contact@wtfuniversity.com" className={styles.supportLink}>
            Speak with the WTF University Team →
          </a>
        </div>
      </div>
    </section>
  );
};
