        /*
          간단한 웹 터미널 구현 (Vanilla JS)
          - 명령 목록: help, clear, echo, date, time, ls, cat, calc, history, whoami
          - 명령 기록(history) 지원 (↑↓)
          - Ctrl+L : clear
          - 안전성: calc는 허용된 문자만 평가

          
          - cmd, 채팅 박스, 여러 줄 입력 기능
        */

        (() => {
            const terminal = document.getElementById('terminal');
            const input = document.getElementById('cmd');
            const promptLabel = document.getElementById('prompt-label');

            const fakeFS = {
                'readme.txt': '이것은 예시 파일입니다.\n웹 CMD에서 cat 명령으로 볼 수 있습니다.',
                'notes.md': '# 메모\n- 웹 CMD 예제\n- 작성자: guest',
                'todo.txt': '- 설계\n- 구현\n- 테스트'
            };

            const state = {
                cwd: '~',
                user: 'guest',
                history: [],
                histIndex: null
            };

            const commands = {
                help: {
                    desc: '사용 가능한 명령 출력',
                    exec: (args) => {
                        const cmds = Object.keys(commands).sort().map(k => `  ${k.padEnd(8)} - ${commands[k].desc}`).join('\n');
                        return `사용 가능한 명령:\n${cmds}\n\n예) echo hello\n예) calc 3*(4+5)\n`;
                    }
                },
                clear: {
                    desc: '화면 지우기',
                    exec: (args) => { terminal.innerHTML = ''; return null; }
                },
                echo: {
                    desc: '인자들을 그대로 출력',
                    exec: (args) => args.join(' ')
                },
                date: {
                    desc: '오늘 날짜 출력',
                    exec: () => (new Date()).toLocaleDateString()
                },
                time: {
                    desc: '현재 시간 출력',
                    exec: () => (new Date()).toLocaleTimeString()
                },
                whoami: {
                    desc: '사용자 확인',
                    exec: () => state.user
                },
                ls: {
                    desc: '현재 디렉터리(가상) 파일 목록',
                    exec: () => Object.keys(fakeFS).map(f => f).join('\n')
                },
                cat: {
                    desc: '파일 내용 보기: cat <파일명>',
                    exec: (args) => {
                        if (!args[0]) return '사용법: cat <파일명>';
                        const name = args[0];
                        if (fakeFS[name]) return fakeFS[name];
                        return `cat: ${name}: 그런 파일 없음`;
                    }
                },
                calc: {
                    desc: '간단한 수식 계산: calc <expression>',
                    exec: (args) => {
                        const expr = args.join(' ');
                        if (!expr) return '사용법: calc <수식>';
                        // 안전한 평가: 숫자, 공백, 사칙연산, 소수점, 괄호, %, Math.pow(^ 아님)만 허용
                        if (!/^[0-9+\-*/().%\s]+$/.test(expr)) return 'calc: 허용되지 않는 문자 포함';
                        try {
                            // '%' 처리: JS에서 %는 모듈로 연산이므로 허용
                            const result = Function('"use strict"; return (' + expr + ')')();
                            if (typeof result === 'number' && isFinite(result)) return String(result);
                            return 'calc: 결과가 수가 아님';
                        } catch (e) {
                            return 'calc: 수식 평가 실패';
                        }
                    }
                },
                history: {
                    desc: '명령 기록 보기',
                    exec: () => state.history.map((h, i) => `${i + 1}  ${h}`).join('\n')
                }
            };

            // 초기 메시지
            writeLine('웹 CMD에 오신 것을 환영합니다. `help`를 입력하세요.', 'muted');

            // focus 및 입력 처리
            input.focus();
            window.addEventListener('click', () => input.focus());

            function writeLine(text = '', cls = 'output ok') {
                const el = document.createElement('div');
                el.className = 'line ' + cls;
                el.textContent = text;
                terminal.appendChild(el);
                terminal.scrollTop = terminal.scrollHeight;
            }

            function runCommandLine(raw) {
                if (!raw.trim()) return;
                // 기록에 추가
                state.history.push(raw);
                state.histIndex = null;

                // 화면에 프롬프트+명령 출력
                const header = `${state.user}@web:${state.cwd}$ ${raw}`;
                writeLine(header, 'muted');

                const parts = raw.trim().split(/\s+/);
                const cmd = parts[0].toLowerCase();
                const args = parts.slice(1);

                if (commands[cmd]) {
                    try {
                        const out = commands[cmd].exec(args);
                        if (out !== null && out !== undefined) {
                            // 여러 줄이라도 그대로 출력
                            out.split('\n').forEach(line => writeLine(line, 'output ok'));
                        }
                    } catch (err) {
                        writeLine(String(err), 'output err');
                    }
                } else {
                    writeLine(`${cmd}: 명령을 찾을 수 없습니다. (help 입력)`, 'output err');
                }
            }

            // 엔터 처리
            input.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter') { ev.preventDefault(); const v = input.value; input.value = ''; runCommandLine(v); }
                else if (ev.key === 'ArrowUp') { ev.preventDefault(); navigateHistory(-1); }
                else if (ev.key === 'ArrowDown') { ev.preventDefault(); navigateHistory(1); }
                else if (ev.ctrlKey && ev.key.toLowerCase() === 'l') { ev.preventDefault(); commands.clear.exec(); }
            });

            function navigateHistory(dir) {
                const h = state.history;
                if (h.length === 0) return;
                if (state.histIndex === null) state.histIndex = h.length;
                state.histIndex = Math.max(0, Math.min(h.length - 1, state.histIndex + dir));
                input.value = h[state.histIndex] || '';
                // 히스토리 끝내면 빈값
                if (dir === 1 && state.histIndex === h.length - 1 && input.value === h[state.histIndex]) {
                    // OK
                }
            }

            // 간단한 탭 완성(파일명)
            input.addEventListener('keydown', (ev) => {
                if (ev.key === 'Tab') {
                    ev.preventDefault();
                    const txt = input.value.trim();
                    if (!txt) return;
                    const parts = txt.split(/\s+/);
                    const cmd = parts[0];
                    if (cmd === 'cat' || cmd === 'ls' || cmd === 'open') { // file completions
                        const partial = parts[1] || '';
                        const matches = Object.keys(fakeFS).filter(f => f.startsWith(partial));
                        if (matches.length === 1) {
                            input.value = cmd + ' ' + matches[0] + ' ';
                        } else if (matches.length > 1) {
                            writeLine(matches.join('  '), 'muted');
                        }
                    }
                }
            });

            // update prompt label
            
            function updatePrompt() { promptLabel.textContent = `${state.user}@web:${state.cwd}`; }
            updatePrompt();

            // Accessibility: screen-reader friendly announce when new output
            const live = document.createElement('div');
            live.setAttribute('aria-hidden', 'true');
            live.style.position = 'absolute'; live.style.left = '-9999px';
            document.body.appendChild(live);

            // expose for debugging in console
            window.webcmd = { runCommandLine, writeLine, state, commands, fakeFS };

        })();