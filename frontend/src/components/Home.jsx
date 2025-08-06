// Home.js
import React from 'react';
import { Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer, LoginButton, GuestButton, HomeContainer, SchoolInfo, SchoolImage, Title, LoremTextContainer, AdminRegisterLink, ThemeToggleButton, HeroDivider } 
from '../styles/styles'
import { LoremIpsum } from 'lorem-ipsum';
import bg from "../assets/bg.png";
import bg1 from "../assets/bg1.png";
import schoolimg from "../assets/schoolimg.jpg";
import { Link, useNavigate } from 'react-router-dom'; 
import { useTheme } from '../App';
import styled from 'styled-components';

const lorem = new LoremIpsum();

const erpFacts = [
  "🚀 Boost productivity: Our ERP system automates routine tasks, freeing your staff to focus on what matters most.",
  "📊 Real-time insights: Make smarter decisions with instant access to all your school's data in one place.",
  "🔒 Secure & reliable: Protect sensitive student and staff information with enterprise-grade security.",
  "🌐 Access anywhere: Cloud-based ERP means you can manage your school from any device, anytime.",
  "🤝 Seamless collaboration: Teachers, students, and parents stay connected through integrated communication tools.",
  "💡 Customizable dashboards: Track attendance, grades, and performance with beautiful, interactive dashboards.",
  "📈 Scalable for growth: Our ERP grows with your institution, from small schools to large universities.",
  "⏱️ Save time: Automated attendance, grading, and scheduling reduce manual work and errors.",
  "🎯 All-in-one solution: Manage academics, administration, library, exams, and more from a single platform.",
  "🏆 Improve outcomes: Data-driven insights help educators personalize learning and boost student success."
];

// Styled components for the new sections
const SectionContainer = styled.section`
  padding: 80px 40px;
  background: ${({ bgColor }) => bgColor || '#f8fafc'};
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionContent = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 40px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  font-size: 1.5rem;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 12px;
`;

const FeatureDescription = styled.p`
  color: #718096;
  line-height: 1.6;
`;

const ContactForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  }
`;

const Home = () => {
  const [factIndex, setFactIndex] = React.useState(0);
  const [fade, setFade] = React.useState(true);
  const navigate = useNavigate();
  const { themeMode, toggleTheme } = useTheme();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setFactIndex((prev) => (prev + 1) % erpFacts.length);
        setFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <>
      <Navbar>
        <Logo src={schoolimg} alt="Logo" />
        <NavigationLinks>
          <NavLink onClick={() => scrollToSection('about')}>About Us</NavLink>
          <NavLink onClick={() => scrollToSection('products')}>Products</NavLink>
          <NavLink onClick={() => scrollToSection('contact')}>Contact Us</NavLink>
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
        </ButtonsContainer>
      </Navbar>
      
      <HomeContainer>
        <SchoolInfo>
          <Title>EduSphere -A Digital School Ecosystem</Title>
          <LoremTextContainer>
            <p style={{
              opacity: fade ? 1 : 0,
              transition: 'opacity 0.4s',
              minHeight: 48,
              fontWeight: 500,
              fontSize: '1.15rem',
              color: '#2563eb',
              letterSpacing: 0.2,
              textShadow: '0 2px 8px rgba(37,99,235,0.08)'
            }}>{erpFacts[factIndex]}</p>
          </LoremTextContainer>
          <AdminRegisterLink to="/admin/register">Admin Register</AdminRegisterLink>
        </SchoolInfo>
        <HeroDivider />
        <SchoolImage src={bg} alt="pupils" />
      </HomeContainer>

      {/* About Us Section */}
      <SectionContainer id="about" bgColor="#f8fafc">
        <SectionContent>
          <SectionTitle>About EduSphere</SectionTitle>
          <SectionSubtitle>
            We are revolutionizing education management with our comprehensive digital ecosystem designed specifically for schools and educational institutions.
          </SectionSubtitle>
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>🎓</FeatureIcon>
              <FeatureTitle>Educational Excellence</FeatureTitle>
              <FeatureDescription>
                Our platform is built by educators, for educators. We understand the unique challenges of modern education and provide solutions that truly work.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🚀</FeatureIcon>
              <FeatureTitle>Innovation First</FeatureTitle>
              <FeatureDescription>
                Leveraging cutting-edge technology to create intuitive, powerful tools that streamline administrative tasks and enhance learning outcomes.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🤝</FeatureIcon>
              <FeatureTitle>Community Driven</FeatureTitle>
              <FeatureDescription>
                We believe in the power of collaboration. Our platform connects teachers, students, parents, and administrators in meaningful ways.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </SectionContent>
      </SectionContainer>

      {/* Products Section */}
      <SectionContainer id="products" bgColor="#ffffff">
        <SectionContent>
          <SectionTitle>Our Products</SectionTitle>
          <SectionSubtitle>
            Discover our comprehensive suite of educational management tools designed to transform how schools operate and students learn.
          </SectionSubtitle>
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>Student Management</FeatureTitle>
              <FeatureDescription>
                Complete student lifecycle management from enrollment to graduation. Track attendance, grades, and performance with ease.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>👨‍🏫</FeatureIcon>
              <FeatureTitle>Teacher Portal</FeatureTitle>
              <FeatureDescription>
                Empower teachers with tools for lesson planning, grade management, and student communication in one integrated platform.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>📚</FeatureIcon>
              <FeatureTitle>Digital Library</FeatureTitle>
              <FeatureDescription>
                Access to vast digital resources, e-books, and educational materials. Manage library operations efficiently.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>📅</FeatureIcon>
              <FeatureTitle>Event Management</FeatureTitle>
              <FeatureDescription>
                Organize school events, parent-teacher meetings, and academic calendars with our comprehensive scheduling system.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>📈</FeatureIcon>
              <FeatureTitle>Analytics Dashboard</FeatureTitle>
              <FeatureDescription>
                Data-driven insights into student performance, attendance trends, and institutional metrics for informed decision-making.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🔔</FeatureIcon>
              <FeatureTitle>Communication Hub</FeatureTitle>
              <FeatureDescription>
                Seamless communication between teachers, students, parents, and administrators with real-time notifications and announcements.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </SectionContent>
      </SectionContainer>

      {/* Contact Us Section */}
      <SectionContainer id="contact" bgColor="#f8fafc">
        <SectionContent>
          <SectionTitle>Contact Us</SectionTitle>
          <SectionSubtitle>
            Ready to transform your educational institution? Get in touch with our team to learn more about how EduSphere can benefit your school.
          </SectionSubtitle>
          <ContactForm onSubmit={handleContactSubmit}>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput type="text" placeholder="Your name" required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput type="email" placeholder="your.email@school.com" required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea placeholder="Tell us about your needs and how we can help..." required />
            </FormGroup>
            <SubmitButton type="submit">Send Message</SubmitButton>
          </ContactForm>
        </SectionContent>
      </SectionContainer>
    </>
  );
};

export default Home;
